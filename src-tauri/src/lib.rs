use anyhow::Result;
use chrono::{DateTime, Duration, Local};
use serde::{Deserialize, Serialize};

const APP_NAME: &str = "com.judethings/streak";
const CONFIG_NAME: &str = "streak-config";

#[derive(Debug, Serialize, Default)]
pub struct StreakResponse {
    pub streak: u64,
    pub timestamp: String,
    pub streak_incremented: bool,
    pub streak_broken: bool,
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
fn get_streak() -> Result<StreakResponse, String> {
    let now = Local::now();
    let mut config: MyConfig = confy::load(APP_NAME, CONFIG_NAME).unwrap_or_default();
    let mut response = StreakResponse {
        timestamp: now.to_string(),
        longest_streak: config.longest_streak,
        streak: config.streak,
        streak_broken: false,
        streak_incremented: false,
    };

    let last_date = config.last_streak_date.date_naive();
    let today = now.date_naive();

    if now.signed_duration_since(config.last_streak_date) >= Duration::hours(25) {
        config.streak = MyConfig::default().streak;
        config.last_streak_date = now;
        confy::store(APP_NAME, CONFIG_NAME, &config).map_err(|e| e.to_string())?;

        response.streak = config.streak;
        response.streak_incremented = false;
        response.streak_broken = true;
        response.longest_streak = config.longest_streak;
        return Ok(response);
    }

    if today.signed_duration_since(last_date) == Duration::days(1) {
        config.streak = config.streak.saturating_add(1);
        config.last_streak_date = now;

        if config.streak > config.longest_streak {
            config.longest_streak = config.streak;
        }
        confy::store(APP_NAME, CONFIG_NAME, &config).map_err(|e| e.to_string())?;
        response.streak = config.streak;
        response.longest_streak = config.longest_streak;
        response.streak_broken = false;
        response.streak_incremented = true;
    }

    Ok(response)
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
