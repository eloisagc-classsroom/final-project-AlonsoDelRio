//Bibliotecas necesarias para los módulos y sensores usados
#include <SimpleDHT.h>
//#include <SPI.h>
#include <LiquidCrystal.h> 

//Definición de variables para los sensores de humedad y LDR en los pines A0 y A5
#define humidity_sensor_pin A0
#define ldr_pin A5
//Establecemos el valor de la fotoresistencia LDR
int ldr_value = 0;

//Definimos e inicializamos el sensor DHT
int pinDHT11 = 2;
SimpleDHT11 dht11(pinDHT11);

//Inicializamos la pantalla LCD en el siguiente orden de pines
//                RS,  E, D4, D5, D6, D7 del modulo 1602A
LiquidCrystal lcd(13, 12, 11, 10, 9, 8); 

//Asignamos el control de la bomba de agua al pin 3 con una velocidad de bombeo de 255
int water_pump_pin = 3;
int water_pump_speed = 255;

//Utilizamos variables para el control de la luz
int luz = 0;

//APlicamos el setup del arduino
void setup() {
  lcd.begin(16, 2);
  Serial.begin(9600);
}

void loop() {
// Mide la temperatura y humedad relativa y muestra resultado
  Serial.println("*******************************");
  Serial.println("Muestra DHT11…");
  //Datos que utilizaremos para las medidas del sensor DHT11
  byte temperature = 0;
  byte humidity_in_air = 0;
  byte data[40] = {0};

  //Detecta en caso de que exista una falla por parte del sensor DHT11
  //Y muestra que error ocurre
  int err = SimpleDHTErrSuccess;
  //En caso de que no haya error y funcione el sensor, obtendrá la 
  //temperatura y humedad relativa
  if ((err = dht11.read(&temperature, &humidity_in_air, NULL)) != SimpleDHTErrSuccess) {
    Serial.print("Read DHT11 failed, err="); Serial.print(SimpleDHTErrCode(err));
    Serial.print(","); Serial.println(SimpleDHTErrDuration(err)); delay(2000);
    return;
  }
  
  //Obtenemos los datos de la humedad en tierra
  int ground_humidity_value = map(analogRead(humidity_sensor_pin), 0, 1023, 100, 0);
  //la cantidad de resistencia aplicada por parte del sensor LDR
  int ldr_value = map(analogRead(ldr_pin), 1023, 0, 100, 0);
  luz = 100-ldr_value;

  //Imprimimos los datos en el monitor en serie
  Serial.print("Temperatura: ");Serial.print((int)temperature);Serial.print(" *C, ");
  Serial.print("Humedad relativa en aire: ");Serial.print((int)humidity_in_air); Serial.println(" %");
  Serial.print("Humedad en suelo: ");Serial.print(ground_humidity_value);Serial.println("%");
  Serial.print("Luz: ");Serial.print(luz);Serial.println("%");
  Serial.println("*******************************");

  //Imprimimos los resultados en la pantalla LCD
  lcd.begin(16, 2);
  lcd.setCursor(0,0);
  lcd.print("Temp: ");lcd.print(temperature);lcd.print("*C");
  lcd.setCursor(0,1);
  lcd.print("HRA: ");lcd.print((int)humidity_in_air);lcd.print("%");
  delay(3000);
  lcd.clear();
  
  lcd.setCursor(0,0);
  lcd.print("HT: ");lcd.print(ground_humidity_value);lcd.print("%");
  lcd.setCursor(0,1);
  lcd.print("Luz: ");lcd.print(luz);lcd.print("%");
  delay(3000);
  lcd.clear();
  
  //**************************************************************
  //Establecemos las condiciones de riego default:
  //Si la humedad en el suelo es inferior al 40%, 
  //si la luminosidad es inferior al 10%,
  //y si la temperatura es mayor a 20°C,
  if( ground_humidity_value<40 && luz<10 && temperature>20) {
    //entonces la bomba se enciende
    //a su velocidad maxima durante 5 segundos
    //y muestra en pantalla que el riego ha comenzado 
    
    Serial.println("El sistema ha comenzado a bombear agua");
    digitalWrite(water_pump_pin, HIGH);
    analogWrite(water_pump_pin, water_pump_speed);
    lcd.begin(16, 2);
  }
  else{
    //En caso de que no se  cumpla alguno de los requisitos anteriores,
    //el sistema no riega
    digitalWrite(water_pump_pin, LOW);
    Serial.println("Riego detenido");
 } 
 lcd.begin(16, 2);
 lcd.clear();
 
}
