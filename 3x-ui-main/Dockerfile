# ========================================================
# Stage: Builder
# ========================================================
FROM golang:1.26-alpine AS builder

WORKDIR /app
ARG TARGETARCH

# Устанавливаем зависимости для сборки
RUN apk --no-cache --update add \
  build-base \
  gcc \
  curl \
  unzip

# Копируем весь проект
COPY . .

# Делаем DockerInit.sh исполняемым
RUN chmod +x ./3x-ui-main/DockerInit.sh

# Настройки для сборки
ENV CGO_ENABLED=1
ENV CGO_CFLAGS="-D_LARGEFILE64_SOURCE"

# Сборка x-ui
RUN go build -ldflags "-w -s" -o build/x-ui main.go

# Запуск DockerInit.sh
RUN ./3x-ui-main/DockerInit.sh "$TARGETARCH"

# ========================================================
# Stage: Final Image of 3x-ui
# ========================================================
FROM alpine

ENV TZ=Asia/Tehran
WORKDIR /app

# Устанавливаем runtime-зависимости
RUN apk add --no-cache --update \
  ca-certificates \
  tzdata \
  fail2ban \
  bash \
  curl \
  openssl

# Копируем бинарники и скрипты из builder
COPY --from=builder /app/build/ /app/
COPY --from=builder /app/3x-ui-main/DockerEntrypoint.sh /app/
COPY --from=builder /app/3x-ui-main/x-ui.sh /usr/bin/x-ui

# Настройка fail2ban
RUN rm -f /etc/fail2ban/jail.d/alpine-ssh.conf \
  && cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local \
  && sed -i "s/^\[ssh\]$/&\nenabled = false/" /etc/fail2ban/jail.local \
  && sed -i "s/^\[sshd\]$/&\nenabled = false/" /etc/fail2ban/jail.local \
  && sed -i "s/#allowipv6 = auto/allowipv6 = auto/g" /etc/fail2ban/fail2ban.conf

# Делаем скрипты исполняемыми
RUN chmod +x /app/DockerEntrypoint.sh /usr/bin/x-ui

# Порты и тома
EXPOSE 2053
VOLUME [ "/etc/x-ui" ]

# Запуск
ENTRYPOINT [ "/app/DockerEntrypoint.sh" ]
CMD [ "x-ui" ]