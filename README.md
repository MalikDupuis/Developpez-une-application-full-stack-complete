# P6-Full-Stack-reseau-dev

## Front

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.3.

Don't forget to install your node_modules before starting (`npm install`).

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Where to start

As you may have seen if you already started the app, a simple home page containing a logo, a title and a button is available. If you take a look at its code (in the `home.component.html`) you will see that an external UI library is already configured in the project.

This library is `@angular/material`, it's one of the most famous in the angular ecosystem. As you can see on their docs (https://material.angular.io/), it contains a lot of highly customizable components that will help you design your interfaces quickly.

Note: I recommend to use material however it's not mandatory, if you prefer you can get ride of it.

Good luck!

## Backend 

Spring Boot Backend - Setup and Run Instructions

Prerequisites

Ensure you have the following installed on your system:

Java 17 or later

Maven 3.x

PostgreSQL/MySQL (if using a database)

Git (optional, for cloning the repository)

Installation Steps

1. Clone the Repository

git clone <repository-url>
cd <project-directory>

2. Configure the Database

Update application.properties or application.yml in src/main/resources with your database configuration:

spring.datasource.url=jdbc:postgresql://localhost:5432/your_database
spring.datasource.username=your_username
spring.datasource.password=your_password

If using MySQL, adjust the JDBC URL accordingly:

spring.datasource.url=jdbc:mysql://localhost:3306/your_database

3. Build the Project

mvn clean install

4. Run the Application

mvn spring-boot:run

OR

java -jar target/<your-app-name>.jar

5. Access the API

Once the application is running, access the API at:

http://localhost:8080

By default, Spring Boot runs on port 8080. You can change this in application.properties:

server.port=9090

6. API Documentation (Optional)

If Swagger is enabled, you can check the API documentation at:

http://localhost:8080/swagger-ui/index.html

Running Tests

To execute unit and integration tests, run:

mvn test

Deployment

To deploy the application, package it as a JAR and deploy it on a cloud platform or a dedicated server.

Troubleshooting

Port already in use? Try changing the server.port in application.properties.

Database connection issues? Ensure the database is running and credentials are correct.

Dependency issues? Run mvn clean install -U to force update dependencies.

Contributing

Feel free to fork the repository and submit pull requests.



