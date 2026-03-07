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