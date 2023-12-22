use serde::{Deserialize, Serialize};
use std::fs::File;
use std::io::Read;

#[derive(Serialize, Deserialize)]
pub struct Event {
    pub name: String,
    date: String,
    description: String,
}

pub fn read_json() -> Vec<Event> {
    let file_path = "./test.json";

    let mut file = File::open(file_path).expect("");
    let mut contents = String::new();
    file.read_to_string(&mut contents).expect("Erreur lors de la lecture du fichier");

    serde_json::from_str(&contents).expect("Erreur lors de la désérialisation JSON")
}
