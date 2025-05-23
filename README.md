# Concordia Campus Guide

This project is a full-stack map-based application with a Python backend and a React Native frontend using Expo. It provides location-based functionality with real-time rendering.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Running the project](#running-the-project)
- [Unit Test Prerequisites](#unit-test-prerequisites)
- [Contributors](#contributors)

---

### Prerequisites

#### Backend

Make sure you have the following tools installed for the backend:

- **MiniConda**: For managing Python environments and dependencies.
  - MiniConda comes with a python3 version that must be used, not another manually installed python version.
- **PostGIS**: A spatial database extender for PostgreSQL, used for geospatial data storage and queries.
- **Docker**: For containerizing and running the backend services.

#### Frontend

Ensure you have the following tools installed for the frontend:

- **React**: A JavaScript library for building user interfaces.
- **Expo**: A framework and platform for universal React applications.
- **React Native**: For building native mobile applications.
- **Expo App**: Install the expo app in your device.

#### How to make sure that all the Prerequisites are correctly installed

1.  Run The following commands:
    ```bash
    python --version
    conda --version
    docker --version
    docker-compose --version
    npm --version
    ```
2.  If any of the above commands doesn't display the program's version, check that it is correctly installed and that the executables are defined in your system path

---

### Getting Started

To set up and run the project locally, follow the instructions below.

---

### Backend Setup

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/kaoutarell/Concordia_Campus_Guide
   cd Concordia_Campus_Guide/ccg_backend/

   ```

2. **Set Up the Database with Docker**:

   ```bash
   cd docker-configs
   docker-compose up -d

   ```

3. **Issues : In case the image is not pulled try adding this to docker engine config**

   ```bash
     "experimental": false,
     "registry-mirrors": [
    "https://dockerhub.azk8s.cn"
     ]
   ```

4.**Create the Python Environment**:

# Backend

Make sure you have the following tools installed for the backend:

- **Pytest 8.3.4**: Required for running backend unit tests.
- **Pytest-Cov 6.0.0**: Generates test coverage reports.
- **Pytest-Django 4.9.0**: Provides Django-specific test utilities.

## Installation

To ensure you have the correct dependencies, set up your Conda environment using the `environment.yml` file:

```bash
conda env create -f environment.yml
```

If the environment is already created, update it using:

```bash
conda env update --file environment.yml --prune --name myenv
```

Note if you add a library in the backend make sure to add it to file:

```
 conda env export --no-builds > environment.yml
```

Activate the environment:

```bash
conda activate myenv
```

- Before activating the environment, you may need to run the following command (conda_root_directory is the directory where you installed conda):

  ```bash
    # For Windows 10/11
    %conda_root_directory%/Library/bin/conda.bat init cmd.exe
    # AND/OR
    %conda_root_directory%/Library/bin/conda.bat init powershell
    # For MacOS
    conda init zsh

  ```

- Activate the environment:

  ```bash
  conda activate myenv
  ```

  5.**Run the Python Backend**:

- python migration
  ```bash
  python manage.py makemigrations
  python manage.py migrate
  python manage.py loaddata campus_buildings.json departments.json services.json routes.json shuttle_stops.json shuttle_schedule.json points_of_interest.json
  ```
- Create a .env file in ccg_backend/ directory and add the following (See wiki for actual values):
  ```bash
  SECRET_KEY=<django secret key>
  ORS_BASE_URL=<ors base url for directions api>
  OTP_BASE_URL=<otp base url for directions api>
  DB_PASSWORD=<postgres db password>
  ```
- run python

  ```bash
  python manage.py createsuperuser
  python manage.py runserver 0.0.0.0:8000

  ```

- http://<ipv4>:8000/admin
- http://<ipv4>:8000/api/buildings-by-campus/?campus=LOY
- http://<ipv4>:8000/api/buildings-by-campus/?campus=SGW

---

### Frontend Setup

1.  **Create a .env file in ccg_mobile/ directory and add the following (change <ipv4> with your local ip address):**
    ```bash
    EXPO_PUBLIC_BASE_URL=http://<ipv4>:8000/api/
    EXPO_PUBLIC_CLARITY_PROJECT_ID=<clarity project id>
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run frontend**
    ```bash
    # Expo Go Build
    npm start
    # OR
    # Dev Build (replace <os> with 'android' or 'ios')
    npm run <os>
    ```
    Error fix (start not found , try npm run) command :

```bash
npm install -g expo-cli
```

### Running the project

#### Backend

Run the following:

```bash
conda activate myenv
cd ccg_backend
# For Windows
run_backend.bat
# For Mac/Linux
./run_backend.sh
```

#### Frontend

```bash
cd ccg_frontend\ccg_mobile
# If ip address changed, edit .env
# EXPO_PUBLIC_BASE_URL=http://<ip>:8000/api/
npm start
```

## Unit Test Prerequisites

## Backend

Make sure you have the following tools installed for the backend:

- **Pytest 8.3.4**: Required for running backend unit tests.
- **Pytest-Cov 6.0.0**: Generates test coverage reports.
- **Pytest-Django 4.9.0**: Provides Django-specific test utilities.

### Installation

To ensure you have the correct dependencies, set up your Conda environment using the `environment.yml` file:

```bash
conda env create -f environment.yml
```

If the environment is already created, update it using:

```bash
conda env update --file environment.yml --prune --name myenv
```

Activate the environment:

```bash
conda activate myenv
```

### Running Tests

Once the environment is set up, you can run the tests using:

```bash
pytest
```

To check test coverage, run:

```bash
pytest --cov=mapengine --cov-report=term-missing
```

## Frontend

Make sure you have the following tools installed for the frontend:

- **"jest" ~29.7.0"** : Jest is required for running frontend unit tests.
- **"jest-expo ~52.0.3"** : Jest-Expo provides an environment for testing React Native apps in Expo.
- **"@testing-library/react-native ^13.0.1"** : This library offers utilities for testing React Native components.

### Installation

To ensure you have the correct dependencies, get them from package.json or install them using npm:

```bash
  npm i
```

or

```bash
  npm install --save-dev @testing-library/react-native@^13.0.1
  npm i  jest jest-expo@~52.0.3
```

### Running Tests

Once all dependencies are installed run :

```bash
 npm run test
```

## End-to-End Testing

### Prerequisites

- Install maestro: https://docs.maestro.dev/getting-started/installing-maestro
- Backend is running.
- Frontend is running on an emulator.

### Maestro Studio - Using Emulator

To start the Maestro Studio webapp:

```bash
cd ccg_frontend/ccg_mobile/maestro

maestro studio
```

### Run Tests

To run new tests, make sure that all test suite folders are included in .maestro/config.yaml and are also included in the command below.

```bash
cd ccg_frontend/ccg_mobile/maestro

 maestro test --config .maestro/config.yaml launch/* app_startup/* feature_1/* feature_2/*
```

### Generate report:

To run new tests, make sure that all test suite folders are included in .maestro/config.yaml and are also included in the command below.

```bash
cd ccg_frontend/ccg_mobile/maestro

maestro test --format junit --config .maestro/config.yaml launch/* app_startup/* feature_1/* feature_2/*
```

### Maestro Studio - Using Physical Device (Android)

Prerequisites:
- Enable Developer Options ( Settings → About phone → Tap Build Number 7 times)
- Install a Mock Location App (i.e., Fake GPS Location) and set location to H building. Note that this is the location set to run the end-to-end tests.
- In your phone's Settings → Developer Options, find Select mock location app and choose the installed fake GPS app.
- Connect your phone to your computer and in your phone's Settings → Developer Options, enable USB debugging.
- Ensure that Android SDK is installed on you computer.
- Download latest Android APK release build and make sure it is running on your phone.

### Find Attached Device 

Maestro will need your physical device ID to run tests with it. To find your device id run the following.

```bash
cd Android/Sdk/platform-tools
adb devices
```
The output is a list of devices attached. You will need to copy the device id and include it in all maestro commands, see below.

### Use Maestro Studio Webapp

To start the Maestro Studio webapp:

```bash
cd ccg_frontend/ccg_mobile/maestro

maestro --device your_device_id studio
```

### Run Tests

To run new tests, make sure that all test suite folders are included in .maestro/config.yaml and are also included in the command below.

```bash
cd ccg_frontend/ccg_mobile/maestro

 maestro --device your_device_id test --config .maestro/config.yaml launch/* app_startup/* feature_1/* feature_2/* feature_4/* feature_5/*
```

### Generate report:

To run new tests, make sure that all test suite folders are included in .maestro/config.yaml and are also included in the command below.

```bash
cd ccg_frontend/ccg_mobile/maestro

maestro --device your_device_id test --format junit --config .maestro/config.yaml launch/* app_startup/* feature_1/* feature_2/* feature_4/* feature_5/*
```


### Prettier Formatting

Prettier enforces code formatting for consistency. If your PR fails in CI due to formatting issues, run the following commands to auto-format your files and pass the check.

```bash
cd ccg_frontend/ccg_mobile/

npm run format -- --write "**/*.js"
```

### Contributors

- Zeiad Badawy ([@iKozay](https://github.com/iKozay))
- Anh Thien Nguyen [(@chrisanhthien](https://github.com/chrisanhthien))
- Kaoutar El Azzab ([@kaoutarell](https://github.com/kaoutarell))
- Beaudelaire Tsoungui Nzodoumkouo ([@Tsounguinzo](https://github.com/Tsounguinzo))
- Jessica Beauchemin ([@JBeauche](https://github.com/JBeauche))
- Syed Ayaan Jilani ([@CS-ION](https://github.com/CS-ION))
- Miskat Mahmud ([@codedsami](https://github.com/codedsami))
- Yassine Ibhir ([@Yibhir0](https://github.com/Yibhir0))
- Mohamed Saidi ([@Mohadgb](https://github.com/Mohadgb))
- Omar Hammodan ([@Vega32](https://github.com/Vega32))
- Abdelhamid Saoud Messaoudi ([@saoudmessaoudi](https://github.com/saoudmessaoudi))
