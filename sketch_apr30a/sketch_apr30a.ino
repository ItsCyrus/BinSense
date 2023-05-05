#include <ESP32Servo.h>
#include <Ultrasonic.h>

// define pins for sensors and actuators
#define trigPin1 33  // trig pin for ultrasonic sensor 1
#define echoPin1 25  // echo pin for ultrasonic sensor 1

#define trigPin2 32  // trig pin for ultrasonic sensor 2
#define echoPin2 35  // echo pin for ultrasonic sensor 2

#define irSensorPin 34  // pin for IR sensor

#define servoPin 14  // pin for motor

#define greenLedPin 26  // pin for green LED

#define redLedPin 27  // pin for red LED

// define distance threshold for determining if the dustbin is empty
#define emptyDistance 9

// create objects for sensors and actuators
Ultrasonic ultrasonic1(trigPin1, echoPin1);
Ultrasonic ultrasonic2(trigPin2, echoPin2);
Servo servo;
 
void setup() {
  Serial.begin(115200);
  servo.attach(servoPin);
  pinMode(irSensorPin, INPUT);
  pinMode(greenLedPin, OUTPUT);
  pinMode(redLedPin, OUTPUT);

  digitalWrite(greenLedPin, LOW);
  digitalWrite(redLedPin, LOW);
}

void loop() {
  // read the IR sensor value
  int irSensorValue = digitalRead(irSensorPin);
  
  // if someone is detected by the IR sensor
  if (irSensorValue == LOW) {
    digitalWrite(greenLedPin, HIGH);
    digitalWrite(redLedPin, LOW);
    Serial.println("Person detected");

    // check if the dustbin is empty
    float distance1 = ultrasonic1.read();
    float distance2 = ultrasonic2.read();

    Serial.print("Distance 1: ");
    Serial.print(distance1);
    Serial.print(", Distance 2: ");
    Serial.println(distance2);
    
    if (distance1 < emptyDistance && distance2 < emptyDistance) {
      Serial.println("Dustbin is not empty");
      digitalWrite(greenLedPin, LOW);
      digitalWrite(redLedPin, HIGH);
      servo.write(0);  // close the bin
      delay(2000);
    } else {
      Serial.println("Dustbin is empty");
      servo.write(180);  // open the bin
      while (digitalRead(irSensorPin) == LOW) {
        // keep the bin open as long as someone is detected by the IR sensor
        delay(100);
      }
      servo.write(0);  // close the bin
      digitalWrite(greenLedPin, LOW);
      digitalWrite(redLedPin, LOW);
    }
  } else {
    // if no one is detected by the IR sensor, turn off the LEDs and keep the bin closed
    digitalWrite(greenLedPin, LOW);
    digitalWrite(redLedPin, LOW);
    servo.write(0);
  }
}
