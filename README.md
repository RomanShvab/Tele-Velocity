# Tele-Velocity

## Quick start on a new computer

Install Git and Docker Desktop. On Windows, enable WSL 2 if prompted by
the Docker Desktop installer. Start Docker Desktop and wait until its
engine is ready. You do not need to install Java, Maven, Node.js,
PostgreSQL, or ffmpeg separately: Docker downloads the required dependencies
and builds the application.

Run the following commands in PowerShell or your terminal:

```sh
git clone https://github.com/RomanShvab/Tele-Velocity.git
cd Tele-Velocity
docker compose up -d --build
```

The first run requires an internet connection and may take several minutes.
Open http://localhost:3000 once the backend has started.

Check container status and backend logs:

```sh
docker compose ps
docker compose logs --tail=100 backend
```

## Restarting and updating

Start the application from the project directory:

```sh
docker compose up -d
```

Update to the latest version on GitHub (if you have no local changes):

```sh
git pull --ff-only
docker compose up -d --build
```

Stop the application:

```sh
docker compose down
```

## Data and pgAdmin 4

A fresh clone starts with an empty database. The backend creates tables
on startup, and records are added when you register and use the application.
Cloning the GitHub repository does not transfer data from another computer.

The database is stored in the `postgres_data` directory, and voice files
are stored in the `voice_uploads` Docker volume. Running `docker compose down`
preserves both. To keep your data, do not delete `postgres_data` or run
`docker compose down -v`.

Use these connection settings in pgAdmin 4 installed on the same computer:

| Field | Value |
| --- | --- |
| Host name/address | localhost |
| Port | 5444 |
| Maintenance database | tele_velocity |
| Username | admin |
| Password | 1234 |

Find the tables under `Databases → tele_velocity → Schemas → public → Tables`.
Use Refresh to update the list. To view records, right-click a table
and select View/Edit Data → All Rows.

Ports 3000, 8080, and 5444 must be available. These settings and the password
are intended for local use.
