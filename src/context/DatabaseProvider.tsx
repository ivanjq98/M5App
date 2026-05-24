import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

// 1. Define the SQL script that runs the first time the app opens on the phone
const migrateDbIfNeeded = async (db: any) => {
  const DATABASE_VERSION = 1;
  let { user_version: currentDbVersion } = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version;');

  if (currentDbVersion >= DATABASE_VERSION) return;

  if (currentDbVersion === 0) {
    // Create your telemetry/reading logs table
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS telemetry_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        moisture INTEGER NOT NULL,
        pump_active INTEGER NOT NULL,
        battery INTEGER NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION};`);
  }
};

export function DatabaseDebugger() {
    const db = useSQLiteContext();
  
    useEffect(() => {
      const checkDatabase = async () => {
        try {
          // Query all records currently saved on the disk
          const allLogs = await db.getAllAsync('SELECT * FROM telemetry_logs;');
          
          console.log('--- 💾 LOCAL DATABASE SNAPSHOT ---');
          console.log(`Total rows stored: ${allLogs.length}`);
          console.table(allLogs); // Prints a beautiful scannable table in your terminal
        } catch (error) {
          console.error('Failed to read database:', error);
        }
      };
  
      checkDatabase();
    }, []);
  
    return null;
  }

export function DatabaseProvider({ children }: { children: React.ReactNode }) {
  return (
    <React.Suspense fallback={
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size="large" /></View>
    }>
      {/* Creates or loads a file named "m5_device.db" on the phone's local storage */}
      <SQLiteProvider databaseName="m5_device.db" onInit={migrateDbIfNeeded} useWithWAL>
        {children}
      </SQLiteProvider>
    </React.Suspense>
  );
}