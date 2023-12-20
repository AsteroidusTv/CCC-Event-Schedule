#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod create;
use create::write_json;

#[tauri::command]
fn create_event(create_name_value: &str, create_date_value: &str, create_description_value: &str) -> () {
    let result = write_json(create_name_value.to_string(), create_date_value.to_string(), create_description_value.to_string());
    result
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![create_event])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
