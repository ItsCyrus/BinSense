#include <ESP32Servo.h>

// define pins for sensors and actuators
#define irSensorPin 34  // pin for IR sensor
#define motorPin 14  // pin for motor
#define greenLedPin 26  // pin for green LED
#define redLedPin 27  // pin for red LED

// create a servo object
Servo motor;

void setup() {
  // initialize serial communication
  Serial.begin(115200);

  // initialize IR sensor
  pinMode(irSensorPin, INPUT);

  // initialize motor
  motor.attach(motorPin);

  // initialize LEDs
  pinMode(greenLedPin, OUTPUT);
  pinMode(redLedPin, OUTPUT);
}

void loop() {
  // read the IR sensor
  int irSensorValue = digitalRead(irSensorPin);

  // check if someone is approaching from the front
  if (irSensorValue == LOW) {
    // open the dustbin
    motor.write(180);
    digitalWrite(greenLedPin, HIGH);
    digitalWrite(redLedPin, LOW);
    // keep the lid open while the IR sensor continues to detect someone
    while (digitalRead(irSensorPin) == LOW) {
      // do nothing
    }
    // close the dustbin
    motor.write(0);
    digitalWrite(greenLedPin, LOW);
    digitalWrite(redLedPin, LOW);
  } else {
    // no one is approaching from the front
    digitalWrite(greenLedPin, LOW);
    digitalWrite(redLedPin, LOW);
  }

  // print the IR sensor reading to the serial monitor for debugging
  Serial.println(irSensorValue);

  // wait for a short time before checking again
  delay(100);
}
