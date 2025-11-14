use anyhow::Result;
use chrono::{DateTime, Duration, Local};
use serde::{Deserialize, Serialize};

const APP_NAME: &str = "com.judethings/streak";
const CONFIG_NAME: &str = "streak-config";

#[derive(Debug, Serialize)]
pub struct Streak {
    pub streak: u64,
    pub longest_streak: u64,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct MyConfig {
    #[serde(default)]
    pub streak: u64,
    #[serde(default)]
    pub longest_streak: u64,
    #[serde(default)]
    pub last_streak_date: DateTime<Local>,
}

impl Default for MyConfig {
    fn default() -> Self {
        MyConfig {
            streak: 1,
            longest_streak: 1,
            last_streak_date: Local::now(),
        }
    }
}

#[tauri::command(rename_all = "snake_case")]
fn get_streak() -> Result<Streak, String> {
    let now = Local::now();
    let mut config: MyConfig = confy::load(APP_NAME, CONFIG_NAME).unwrap_or_default();

    let last_date = config.last_streak_date.date_naive();
    let today = now.date_naive();

    if now.signed_duration_since(config.last_streak_date) >= Duration::hours(25) {
        config.streak = 0;
        config.last_streak_date = now;
        confy::store(APP_NAME, CONFIG_NAME, &config).map_err(|e| e.to_string())?;
        return Ok(Streak {
            streak: config.streak,
            longest_streak: config.longest_streak,
        });
    }

    if today.signed_duration_since(last_date) == Duration::days(1) {
        config.streak = config.streak.saturating_add(1);
        config.last_streak_date = now;

        if config.streak > config.longest_streak {
            config.longest_streak = config.streak;
        }

        confy::store(APP_NAME, CONFIG_NAME, &config).map_err(|e| e.to_string())?;
    }

    Ok(Streak {
        streak: config.streak,
        longest_streak: config.longest_streak,
    })
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let config: MyConfig = confy::load(APP_NAME, CONFIG_NAME).unwrap_or_default();
    let _ = confy::store(APP_NAME, CONFIG_NAME, &config);

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![get_streak])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
