# 📸 GeoGallery
<img width="315" height="560" alt="1" src="https://github.com/user-attachments/assets/cbfa3164-1774-458b-a3d4-fad76c900df9" />

GeoGallery is a mobile app built with **React Native** and **Expo** that lets you **take photos and save them with location data** — creating a gallery of memories tied to places.


## ✨ Features
- **Take Photos** using the device camera
- **Save Images** to local file storage
- **Pick Images** from the device gallery
- **Attach Location** using:
  - Device GPS tracking
  - Manual location input
- **Offline Storage** with SQLite

## 📖 Background
Initially, the plan was to allow users to select locations from an interactive Google Map.  
However, Google Maps API requires credit card details even for free usage.  
To keep the project simple and accessible, I switched to **native location tracking** and **manual input**

## 🛠 Tech Stack
- **React Native** (with Expo)
- **Expo Camera** for capturing images
- **Expo FileSystem** for local storage
- **Expo ImagePicker** for selecting images
- **Expo Location** for GPS coordinates
- **SQLite** for local data storage

## 🚀 Installation & Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/geogallery.git
   cd geogallery
   ```
2. Install dependencies:
      ```bash
   npm install
   ```
3. Start the Expo development server:
      ```bash
   npx expo start
   ```
4. Run on your device:
   Scan the QR code in the terminal/Expo Go app
   Or use an emulator
## 🧠 Lessons Learned
- Navigating API restrictions & finding workarounds
- Using native device features in React Native
- Implementing local storage with SQLite
- Balancing feature scope with practical constraints

## Some Screenshots 🖼️
<img width="315" height="560" alt="1" src="https://github.com/user-attachments/assets/cbfa3164-1774-458b-a3d4-fad76c900df9" />
<img width="315" height="560" alt="2" src="https://github.com/user-attachments/assets/33d6322d-218c-44b9-81fb-a3eb84a187b0" />
<img width="315" height="560" alt="3" src="https://github.com/user-attachments/assets/29a44c32-496a-4805-bbdc-63adcb0e8810" />
<img width="315" height="560" alt="4" src="https://github.com/user-attachments/assets/fa407267-91df-4195-b293-d3e5d05b5920" />
<img width="315" height="560" alt="5" src="https://github.com/user-attachments/assets/e7ab18ec-cfd5-493f-9b35-73e8cb854a0b" />
<img width="315" height="560" alt="6" src="https://github.com/user-attachments/assets/fffb7888-df6f-4023-8a33-73df7d20a67f" />
<img width="315" height="560" alt="7" src="https://github.com/user-attachments/assets/7f3000d0-5535-4cda-8882-849a558684b5" />
<img width="315" height="560" alt="8" src="https://github.com/user-attachments/assets/efea96df-5996-44c0-9c8b-40829ba75438" />

