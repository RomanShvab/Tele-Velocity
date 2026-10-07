FROM eclipse-temurin:25-jre

WORKDIR /app

# Устанавливаем ffmpeg для обработки медиафайлов
RUN apt-get update \
	&& apt-get install -y --no-install-recommends ffmpeg \
	&& rm -rf /var/lib/apt/lists/*

COPY target/tele-velocity-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java","-Dspring.profiles.active=docker","-jar","app.jar"]
