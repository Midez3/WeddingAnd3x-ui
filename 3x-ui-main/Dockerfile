# ========================================================
# Stage: Builder
# ========================================================
FROM golang:1.26-alpine AS builder
ARG TARGETARCH

# Рабочая директория — корень проекта
WORKDIR /app

# Установка зависимостей для сборки
RUN apk --no-cache --update add \
    build-base \
    gcc \
    curl \
    unzip \
    dos2unix

# Копируем весь проект в контейнер
COPY . /app

# Настройки Go
ENV CGO_ENABLED=1
ENV CGO_CFLAGS="-D_LARGEFILE64_SOURCE"

# Сборка приложения
RUN #go build -ldflags "-w -s" -o build/x-ui main.go

# Подготовка и запуск скрипта DockerInit.sh
RUN dos2unix 3x-ui-main/DockerInit.sh
RUN chmod +x 3x-ui-main/DockerInit.sh
RUN 3x-ui-main/DockerInit.sh "$TARGETARCH"

# ========================================================
# Stage: Final Image of 3x-ui
# ========================================================
FROM alpine
ENV TZ=Asia/Tehran
WORKDIR /app

# Установка необходимых пакетов
RUN apk add --no-cache --update \
    ca-certificates \
    tzdata \
    fail2ban \
    bash \
    curl \
    openssl

# Копируем собранные файлы из builder
COPY --from=builder /app/build/ /app/
COPY --from=builder /app/DockerEntrypoint.sh /app/
COPY --from=builder /app/x-ui.sh /usr/bin/x-ui

# Настройка fail2ban
RUN rm -f /etc/fail2ban/jail.d/alpine-ssh.conf \
    && cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local \
    && sed -i "s/^\[ssh\]$/&\nenabled = false/" /etc/fail2ban/jail.local \
    && sed -i "s/^\[sshd\]$/&\nenabled = false/" /etc/fail2ban/jail.local \
    && sed -i "s/#allowipv6 = auto/allowipv6 = auto/g" /etc/fail2ban/fail2ban.conf

# Делаем скрипты исполняемыми
RUN chmod +x \
    /app/DockerEntrypoint.sh \
    /app/x-ui \
    /usr/bin/x-ui

# Переменные окружения и порты
ENV XUI_ENABLE_FAIL2BAN="true"
EXPOSE 2053
VOLUME [ "/etc/x-ui" ]

# Запуск приложения
ENTRYPOINT [ "/app/DockerEntrypoint.sh" ]
CMD [ "./x-ui" ]