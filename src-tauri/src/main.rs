#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod create;
mod read;
mod delete;

use create::write_json;
use read::{read_json, Event};
use delete::remove_data_json;

use std::fs;

fn verify_file(file: &str, content: &str,) {
    if  !fs::metadata(file).is_ok() {
        fs::write(file, content).expect("Unable to create file");
    }
}

#[tauri::command]
fn create_event(create_name_value: &str, create_date_value: &str, create_description_value: &str) {
    let result = write_json(create_name_value.to_string(), create_date_value.to_string(), create_description_value.to_string());
    result
}

#[tauri::command]
fn show_event() -> Vec<Event> {
    let result = read_json();
    result
}

#[tauri::command]
fn delete_event(name: &str) {
    let _ = remove_data_json(name, "./test.json");
}

fn main() {
    verify_file("./test.json", "[]");
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![create_event, show_event, delete_event])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
