use anyhow::Result;
use dotenv::dotenv;
use entity::post::{self, Entity as Post};
use sea_orm::{Database, DatabaseConnection, EntityTrait};
use serde::Serialize;
use std::env;
use tauri::{Manager, State};
use tokio::runtime::Runtime;

struct AppState {
    welcome_message: &'static str,
    db: DatabaseConnection,
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

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            dotenv().ok();

            let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");

            // Create the runtime
            let rt = Runtime::new().unwrap();

            // Execute the future, blocking the current thread until completion
            let db = rt
                .block_on(Database::connect(&database_url))
                .expect("Failed to connect to database");

            app.manage(AppState {
                welcome_message: "Welcome to Tauri!",
                db,
            });
            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, get_all_posts])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
