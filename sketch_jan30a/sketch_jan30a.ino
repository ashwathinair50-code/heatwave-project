#include <ESP8266WiFi.h>

const char* ssid     = "SOMAIYA-AP";
const char* password = "12345678";

void setup() {
  Serial.begin(115200);

  WiFi.mode(WIFI_AP);
  WiFi.softAP(ssid, password);

  IPAddress IP = WiFi.softAPIP();
  Serial.println("Access Point Started!");
  Serial.print("AP SSID: ");
  Serial.println(ssid);
  Serial.print("AP IP address: ");
  Serial.println(IP);
}

void loop() {
  // Nothing here for basic AP
}
