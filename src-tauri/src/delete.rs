use std::{fs::File, io::BufReader};

use serde_json::{Value, from_reader};

pub fn remove_data_json(element_to_remove: &str, file_path: &str) -> Result<(), Box<dyn std::error::Error>> {

    let file = File::open(file_path)?;
    let reader = BufReader::new(file);

    let mut data: Vec<Value> = from_reader(reader)?;

    data.retain(|item| {
        if let Some(name) = item.get("name") {
            if let Some(name_str) = name.as_str() {
                return name_str != element_to_remove;
            }
        }
        true
    });

    let file = File::create(file_path)?;
    serde_json::to_writer(file, &data)?;

    Ok(())
}
