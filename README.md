# FCM Notification Service

A simple Node.js background service that consumes push notification requests from RabbitMQ, sends notifications via Firebase Cloud Messaging (FCM), stores delivery results in MySQL, and publishes completion events back to RabbitMQ.

This project is implemented as part of a backend offsite test.

---

## 📌 Features

- Consume messages from RabbitMQ queue `notification.fcm`
- Validate incoming message payload
- Send push notification via Firebase Cloud Messaging (mocked)
- Persist delivery result to MySQL
- Publish completion event to RabbitMQ topic `notification.done`
- Configuration via `.env`
- Fully runnable with Docker

---

## 🏗 Architecture Overview

```
RabbitMQ (notification.fcm)
↓
Node.js Service
↓
Firebase (FCM)
↓
MySQL (fcm_job)
↓
RabbitMQ (notification.done)
```

---

## 🧾 Message Format

Incoming messages must be JSON encoded with the following structure:

```json
{
  "identifier": "string",
  "type": "string",
  "deviceId": "string",
  "text": "string"
}
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- RabbitMQ
- MySQL
- Firebase project credentials

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd fcm-notification-service
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables by creating a `.env` file:
```bash
RABBITMQ_URL=amqp://guest:guest@localhost:5672
FCM_QUEUE=notification.fcm
DONE_TOPIC=notification.done
MYSQL_HOST=localhost
MYSQL_USER=appuser
MYSQL_PASSWORD=apppassword
MYSQL_DATABASE=notification_db
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_ACCESS_TOKEN=your-access-token
```

---

## 📋 Configuration

All configuration is managed through environment variables in the `.env` file:

| Variable | Description | Example |
|----------|-------------|---------|
| `RABBITMQ_URL` | RabbitMQ connection URL | `amqp://guest:guest@localhost:5672` |
| `FCM_QUEUE` | Queue name for incoming notifications | `notification.fcm` |
| `DONE_TOPIC` | Topic name for completion events | `notification.done` |
| `MYSQL_HOST` | MySQL host address | `localhost` |
| `MYSQL_USER` | MySQL username | `appuser` |
| `MYSQL_PASSWORD` | MySQL password | `apppassword` |
| `MYSQL_DATABASE` | MySQL database name | `notification_db` |
| `FIREBASE_PROJECT_ID` | Firebase project ID | `my-project-id` |
| `FIREBASE_ACCESS_TOKEN` | Firebase access token | `token_here` |

---

### ▶️ Running the Service
```bash
node src/index.js
```

Expected output:
```arduino
Connected to RabbitMQ
Queue ready: notification.fcm
Waiting for messages...
```

## 📂 Project Structure

```
fcm-notification-service/
├── src/
│   ├── index.js                 # Application entry point
│   ├── consumers/
│   │   └── fcmConsumer.js      # RabbitMQ message consumer
│   ├── db/
│   │   ├── fcmJobRepo.js       # Database repository for FCM jobs
│   │   └── mysql.js            # MySQL connection pool
│   ├── publishers/
│   │   └── donePublisher.

```

