use anyhow::Result;
use dotenv::dotenv;
use entity::post::{self, Entity as Post};
use redis::Client;
use redis::Connection;
use sea_orm::{Database, DatabaseConnection, EntityTrait};
use serde::Serialize;
use std::env;
use std::sync::Mutex;
use tauri::{Manager, State};
use tokio::runtime::Runtime;

struct AppState {
    welcome_message: &'static str,
    db: DatabaseConnection,
    redis: Mutex<Connection>,
}

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str, state: State<'_, AppState>) -> String {
    format!("{} says {}", name, state.welcome_message)
}

#[derive(Serialize)]
#[serde(tag = "status", rename_all = "lowercase")]
enum ApiResponse<T: Serialize> {
    Success { data: T, message: Option<String> },
    Error { data: Option<T>, message: String },
}

impl<T: Serialize> ApiResponse<T> {
    fn success(data: T) -> Self {
        ApiResponse::Success {
            data,
            message: None,
        }
    }

    fn error(message: String) -> Self {
        ApiResponse::Error {
            data: None,
            message,
        }
    }
}

#[tauri::command]
async fn get_all_posts(
    state: State<'_, AppState>,
) -> Result<ApiResponse<Vec<post::Model>>, String> {
    match Post::find().all(&state.db).await {
        Ok(posts) => Ok(ApiResponse::success(posts)),
        Err(err) => Ok(ApiResponse::error(format!("Database error: {}", err))),
    }
}

#[tauri::command]
fn check_redis_connection(state: State<'_, AppState>) -> ApiResponse<String> {
    let mut redis_conn = state.redis.lock().unwrap(); // ✅ Lock Redis connection

    // ✅ Send PING command to Redis
    let ping_response: redis::RedisResult<String> = redis::cmd("PING").query(&mut *redis_conn);

    match ping_response {
        Ok(ping) => {
            println!("✅ Redis is connected: {}", ping);
            ApiResponse::success("Redis is connected".to_string()) // ✅ Return JSON success response
        }
        Err(err) => {
            println!("❌ Redis ping failed: {}", err);
            ApiResponse::error(format!("Redis connection failed: {}", err)) // ✅ Return JSON error response
        }
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            dotenv().ok();

            let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
            let redis_url = env::var("REDIS_URL").expect("REDIS_URL must be set");

            // Create the runtime
            let rt = Runtime::new().unwrap();

            // Execute the future, blocking the current thread until completion
            let db = rt
                .block_on(Database::connect(&database_url))
                .expect("Failed to connect to database");

            let client = Client::open(redis_url).expect("Failed to create Redis client");
            let redis_conn = client.get_connection().expect("Failed to connect to Redis");

            app.manage(AppState {
                welcome_message: "Welcome to Tauri!",
                db,
                redis: Mutex::new(redis_conn),
            });
            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            get_all_posts,
            check_redis_connection
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
