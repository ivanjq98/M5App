#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>
#include "M5AtomS3.h"

#define SERVICE_UUID        "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
#define COMMAND_CHAR_UUID   "beb5483e-36e1-4688-b7f5-ea07361b26a8"

BLECharacteristic *pCommandCharacteristic;
String currentMode = "RANDOM_CIRCLES";

void rainbowEffect() {
  static uint16_t hue = 0;
  
  // Simple rainbow using RGB
  uint8_t r = (sin(hue * 0.1) * 127 + 128);
  uint8_t g = (sin(hue * 0.1 + 2) * 127 + 128);
  uint8_t b = (sin(hue * 0.1 + 4) * 127 + 128);
  
  AtomS3.Display.fillScreen(AtomS3.Display.color565(r, g, b));
  hue += 8;  // Speed of rainbow
}

void randomCircles() {
  int x = rand() % AtomS3.Display.width();
  int y = rand() % AtomS3.Display.height();
  int r = (AtomS3.Display.width() >> 4) + 3;
  uint16_t c = rand() % 65536;
  AtomS3.Display.fillCircle(x, y, r, c);
}

class MyCallbacks : public BLECharacteristicCallbacks {
  void onWrite(BLECharacteristic *pCharacteristic) {
    String value = pCharacteristic->getValue().c_str();   // Fixed conversion

    Serial.print("Received: ");
    Serial.println(value);

    if (value == "RAINBOW") {
      currentMode = "RAINBOW";
      Serial.println("→ Rainbow Mode Activated");
    } 
    else if (value == "RANDOM_CIRCLES") {
      currentMode = "RANDOM_CIRCLES";
      Serial.println("→ Random Circles Activated");
    }
  }
};

void setup() {
  auto cfg = M5.config();
  AtomS3.begin(cfg);
  
  Serial.begin(115200);
  BLEDevice::init("AtomS3-BLE");

  BLEServer *pServer = BLEDevice::createServer();
  BLEService *pService = pServer->createService(SERVICE_UUID);

  pCommandCharacteristic = pService->createCharacteristic(
    COMMAND_CHAR_UUID,
    BLECharacteristic::PROPERTY_WRITE | BLECharacteristic::PROPERTY_NOTIFY
  );

  pCommandCharacteristic->setCallbacks(new MyCallbacks());
  pCommandCharacteristic->addDescriptor(new BLE2902());

  pService->start();

  BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);
  pAdvertising->start();

  Serial.println("✅ AtomS3-BLE Ready!");
}

void loop() {
  if (currentMode == "RAINBOW") {
    rainbowEffect();
  } else {
    randomCircles();
  }

  delay(30);   // Animation speed
}