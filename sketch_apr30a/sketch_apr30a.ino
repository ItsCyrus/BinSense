// Include the Ultrasonic library
#include <Ultrasonic.h>

// Define the pins used by the ultrasonic sensor
#define trigPin 26
#define echoPin 27

// Initialize the Ultrasonic sensor
Ultrasonic ultrasonic(trigPin, echoPin);

void setup()
{
  // Initialize serial communication at 9600 baud
  Serial.begin(115200);
}

void loop()
{
  // Measure the distance from the ultrasonic sensor
  int distance = ultrasonic.read();

  // Print the distance to the serial monitor
  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.println(" cm");

  // Wait for 500ms before taking another reading
  delay(500);
}
