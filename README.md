# Tele-Velocity

React + Spring Boot + PostgreSQL. Development branch: develop; stable branch:
master. The launch commands build the current checkout. They never switch
branches, pull, or push. Release means a production build of that checkout.
For a stable Release, use a separate checkout of master.

## Windows requirements

Install Git and Docker Desktop with Linux containers (WSL 2). Start Docker
Desktop and wait for its engine. Docker Compose 2.32.2 or newer is required.
Java, Maven, Node, PostgreSQL and ffmpeg are provided inside containers.
The first build requires internet access.

## One-command launch

From PowerShell in the repository root:

~~~powershell
.\dev.cmd
~~~

Development runs in the foreground. Keep this terminal open for watching.
React uses Vite Hot Module Replacement and polling for Windows source mounts.
Backend Java and resources are synchronized into the container, compiled by
Maven, and reloaded by Spring Boot DevTools with an application restart.
Backend restarts briefly interrupt requests. Compilation errors appear in the
terminal; fix them and save again. Changes to pom.xml rebuild the backend.
DevTools is enabled only through the development Maven profile.

After changing frontend dependencies, stop Development, run the following,
then start Development again:

~~~powershell
docker compose -f docker-compose.dev.yml run --rm --no-deps frontend npm ci
~~~

Dockerfile and Compose changes require restarting the launch command.

~~~powershell
.\release.cmd
~~~

Release builds the Spring Boot JAR and static React assets served by nginx,
then starts in the background. It has no source mounts or automatic reload.
Run the same command again to rebuild after source changes.

| Setting | Development | Release |
| --- | --- | --- |
| Website | http://localhost:3000 | http://localhost:3001 |
| Direct backend | http://localhost:8080 | http://localhost:8081 |
| PostgreSQL host | localhost | localhost |
| PostgreSQL port | 5444 | 5445 |
| Database | tele_velocity_dev | tele_velocity_release |
| User | admin | admin |
| Default local password | 1234 | 1234 |
| Compose project | tele-velocity-dev | tele-velocity-release |

Both environments can run simultaneously. Each has its own network, database
volume and voice-upload volume. Ports bind to the local computer. Frontend
requests use /api, proxied to the backend in the same environment, including
voice uploads. VITE_API_URL can override this for another deployment.

Optional local password overrides: create an ignored .env in the root:

~~~dotenv
DEV_DB_PASSWORD=your-development-password
RELEASE_DB_PASSWORD=your-release-password
~~~

PostgreSQL initializes credentials only when its volume is empty. Changing
.env does not change an existing database password; update it in PostgreSQL
as well. Defaults are for local use. A public deployment needs separate
credentials, HTTPS and access configuration.

## Status, logs and stopping

~~~powershell
docker compose -f docker-compose.dev.yml ps
docker compose -f docker-compose.dev.yml logs --tail=100 backend
docker compose -f docker-compose.dev.yml down

docker compose -f docker-compose.yml ps
docker compose -f docker-compose.yml logs --tail=100 backend
docker compose -f docker-compose.yml down
~~~

Ctrl+C stops the foreground Development session. Running down preserves data.
Do not add -v unless you intend to delete that environment's volumes.
A fresh environment starts with an empty database; the backend creates tables
on startup (ddl-auto=update). Records are not copied between environments.

## Existing data

The previous postgres_data/ directory and previous Docker voice volume are
left untouched. New projects use fresh named volumes, so old records do not
appear automatically. Preserve old data; use PostgreSQL dump/restore and copy
voice files if migration is needed. Stop old containers before Development
if they occupy ports 3000, 8080 or 5444. Find them with docker ps -a.

For pgAdmin, use the host, port, database, user and password from the table.
Tables are under Databases → database → Schemas → public → Tables.

## Configuration validation

~~~powershell
docker compose -f docker-compose.dev.yml config --quiet
docker compose -f docker-compose.yml config --quiet
~~~

Backend watching uses the documented Compose sync+exec workflow:
https://docs.docker.com/reference/compose-file/develop/
and Spring Boot classpath restart:
https://docs.spring.io/spring-boot/reference/using/devtools.html
