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

# кешируем зависимости
COPY go.mod go.sum ./
RUN go mod download

# копируем весь проект
COPY . .

ENV CGO_ENABLED=1
ENV CGO_CFLAGS="-D_LARGEFILE64_SOURCE"

RUN go build -ldflags "-w -s" -o /app/x-ui main.go

RUN dos2unix DockerInit.sh && \
    chmod +x DockerInit.sh && \
    ./DockerInit.sh "$TARGETARCH"


# ========================================================
# Final image
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

COPY --from=builder /app /app
COPY --from=builder /app/x-ui.sh /usr/bin/x-ui

RUN chmod +x \
    /app/x-ui \
    /app/DockerEntrypoint.sh \
    /usr/bin/x-ui

ENV XUI_ENABLE_FAIL2BAN="true"

EXPOSE 2053
VOLUME ["/etc/x-ui"]

ENTRYPOINT ["/app/DockerEntrypoint.sh"]
CMD ["./x-ui"]