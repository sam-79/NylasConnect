# Nylas Connect

**NylasConnect** is a mobile application designed to unify and streamline communication by consolidating emails, calendars, and contacts from multiple accounts into a single, user-friendly interface. Paired with AI-powered features, NylasConnect enhances productivity by making it easier to manage your digital communication.

## Key Features
The NylasConnect mobile application leverages the **Nylas API** and **Google Gemini** to offer the following features:

- **Unified Inbox:** Access and manage emails from multiple accounts in one place.
- **AI-Powered Email Summarization:** Quickly understand lengthy email threads with automatically generated summaries.
- **AI-Generated Email Drafts:** Compose emails with the help of AI, using simple prompts.
- **Grammar Correction:** Ensure your emails are error-free with built-in grammar checks.
- **Autoreply:** Set up AI-generated automatic responses to incoming emails.
- **AI Calendar Chatbot:** Interact with your calendar using a chatbot that can answer questions about your schedule.
- **Multi-User Support:** Manage multiple users, each with their own set of emails, calendars, and contacts.

## Technology Stack
- **Frontend:** React Native with Expo SDK for building the mobile application.
- **Backend:** FastAPI ([backend repository](https://github.com/shantanu1905/Inboxone)).
- **APIs:** 
  - **Google Gemini:** For AI-driven functionalities.
  - **Nylas API:** For managing email, calendar, and contacts.

## Screenshots


![nylasconnect_ss](https://github.com/user-attachments/assets/91eb975a-af7a-404f-a6c2-3b6b23fe0f4b)


## Setup Instructions
### Prerequisites:
- **Node.js & npm:** Ensure you have Node.js and npm installed.
- **React Native Env & Expo Setup:** [Refer](https://reactnative.dev/docs/set-up-your-environment) to this guide  

- **Backend Setup:** Ensure the backend service is up and running. Follow the [backend setup instructions](https://github.com/shantanu1905/Inboxone?tab=readme-ov-file#inboxone) if needed.

### Step-by-Step Setup
1. **Clone the Frontend Repository:**
   ```bash
   git clone https://github.com/sam-79/NylasConnect.git
   ```
   
2. **Install Dependencies:**
   Navigate to the project directory and install the required npm packages:
   ```bash
   cd NylasConnect
   npm install
   ```

3. **Start the Application:**
   Launch the Expo development server:
   ```bash
   npx expo start -g
   ```
   

### Running the App on Expo Go

1. Download the **Expo Go** app from the App Store (iOS) or Google Play Store (Android) on your mobile device.

2. Scan the QR code displayed in the terminal to open the app on your device.

### Connecting with server 
When prompted, enter the IP address and port number of the Python server/machine on which the server is running. This ensures that the React Native app can communicate with the backend server.

## Network Configuration

Ensure that both the Python server and the Expo development server are running on the same private network. They need to be able to communicate with each other over the network.

### Firewall Settings

If you encounter issues with network communication, your firewall might be blocking the requests. You can temporarily disable the firewall to check if it's the cause. 

#### Disabling the Firewall on Windows

1. Open the Control Panel.
2. Go to `System and Security > Windows Defender Firewall`.
3. Click `Turn Windows Defender Firewall on or off`.
4. Select `Turn off Windows Defender Firewall` for both private and public networks.
5. Click `OK`.


## Troubleshooting

If you encounter any issues, ensure that:

- Both the server and the Expo development server are running on the same private network.
- The IP address and port number entered in the app match the server's address.
- Your firewall is not blocking network requests.

## License
This project is licensed under the MIT License. See the [LICENSE](https://github.com/sam-79/NylasConnect/blob/main/LICENSE) file for more details.
