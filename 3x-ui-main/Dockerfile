# ========================================================
# Stage: Builder
# ========================================================
FROM golang:1.26-alpine AS builder
ARG TARGETARCH

WORKDIR /app

RUN apk --no-cache add \
    build-base \
    gcc \
    curl \
    unzip \
    dos2unix

COPY . /app

# Переходим в папку исходников
WORKDIR /app/3x-ui-main

ENV CGO_ENABLED=1
ENV CGO_CFLAGS="-D_LARGEFILE64_SOURCE"

RUN go build -ldflags "-w -s" -o /app/build/x-ui main.go

RUN dos2unix DockerInit.sh
RUN chmod +x DockerInit.sh
RUN ./DockerInit.sh "$TARGETARCH"


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

COPY --from=builder /app/build/ /app/
COPY --from=builder /app/3x-ui-main/DockerEntrypoint.sh /app/
COPY --from=builder /app/3x-ui-main/x-ui.sh /usr/bin/x-ui

RUN chmod +x \
    /app/DockerEntrypoint.sh \
    /app/x-ui \
    /usr/bin/x-ui

ENV XUI_ENABLE_FAIL2BAN="true"

EXPOSE 2053
VOLUME ["/etc/x-ui"]

ENTRYPOINT ["/app/DockerEntrypoint.sh"]
CMD ["./x-ui"]