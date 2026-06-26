# Stage 1: Build the application
FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./
# Make maven wrapper executable
RUN chmod +x ./mvnw
# Download dependencies (cache step)
RUN ./mvnw dependency:go-offline

COPY src ./src
# Build the application
RUN ./mvnw clean package -DskipTests

# Stage 2: Run the application
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
# Create uploads directory
RUN mkdir -p uploads
EXPOSE 8081
# Run with production profile
ENTRYPOINT ["java", "-Dspring.profiles.active=prod", "-jar", "app.jar"]
