#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod create;
pub mod read;
mod delete;

use chrono::{Local, DateTime, NaiveDateTime};
use create::{write_json, verify_json_content};
use read::{read_json, Event};
use delete::remove_data_json;
use std::fs;

fn verify_file(file: &str, content: &str) {
    if  !fs::metadata(file).is_ok() {
        fs::write(file, content).expect("Unable to create file");
    }
}

fn verify_date(string_date: &str) -> bool {
    if let Ok(parsed_date) = NaiveDateTime::parse_from_str(string_date, "%Y-%m-%dT%H:%M:%S") {
        let current_date: DateTime<Local> = Local::now();
        parsed_date > current_date.naive_local()
    } else {
        false
    }
}

#[tauri::command]
fn create_event(create_name_value: &str, create_date_value: &str, create_description_value: &str) -> Result<(), String> {
    if verify_date(create_date_value) {
        Err("You cannot create events in the past".to_string())
    } else if !verify_json_content(create_name_value.to_string()) {
        write_json(create_name_value.to_string(), create_date_value.to_string(), create_description_value.to_string());
        Err("HEllo".to_string())
    } else {
        Err("You cannot create two events with the same name!".to_string())
    }
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
