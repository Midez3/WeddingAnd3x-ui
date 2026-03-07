# ========================================================
# Stage: Builder
# ========================================================
FROM golang:1.26-alpine AS builder
ARG TARGETARCH

WORKDIR /app

RUN apk add --no-cache \
    build-base \
    gcc \
    curl \
    unzip \
    dos2unix \
    git

# Сначала копируем только go.mod и go.sum для кеширования зависимостей
COPY 3x-ui-main/go.mod 3x-ui-main/go.sum ./3x-ui-main/

WORKDIR /app/3x-ui-main

# Скачиваем зависимости (этот слой будет кешироваться)
RUN go mod download

# Теперь копируем весь исходный код
COPY 3x-ui-main/ .

ENV CGO_ENABLED=1
ENV CGO_CFLAGS="-D_LARGEFILE64_SOURCE"

# Сборка бинарника
RUN go build -ldflags "-w -s" -o /app/x-ui main.go

# Подготовка init скрипта
RUN dos2unix DockerInit.sh && \
    chmod +x DockerInit.sh && \
    ./DockerInit.sh "$TARGETARCH"

# ========================================================
# Stage: Final Image
# ========================================================
FROM alpine

ENV TZ=Asia/Tehran
WORKDIR /app

RUN apk add --no-cache \
    ca-certificates \
    tzdata \
    fail2ban \
    bash \
    curl \
    openssl

# Копируем бинарник и скрипты
COPY --from=builder /app/x-ui /app/x-ui
COPY --from=builder /app/3x-ui-main/DockerEntrypoint.sh /app/
COPY --from=builder /app/3x-ui-main/x-ui.sh /usr/bin/x-ui

RUN chmod +x \
    /app/x-ui \
    /app/DockerEntrypoint.sh \
    /usr/bin/x-ui

# Настройка fail2ban
RUN rm -f /etc/fail2ban/jail.d/alpine-ssh.conf \
    && cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local \
    && sed -i "s/^\[ssh\]$/&\nenabled = false/" /etc/fail2ban/jail.local \
    && sed -i "s/^\[sshd\]$/&\nenabled = false/" /etc/fail2ban/jail.local \
    && sed -i "s/#allowipv6 = auto/allowipv6 = auto/g" /etc/fail2ban/fail2ban.conf

ENV XUI_ENABLE_FAIL2BAN="true"

EXPOSE 2053
VOLUME ["/etc/x-ui"]

ENTRYPOINT ["/app/DockerEntrypoint.sh"]
CMD ["./x-ui"]