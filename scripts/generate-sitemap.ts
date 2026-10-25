name: Update and Upload Sitemap to Seohost

on:
  workflow_dispatch:
  schedule:
    - cron: '0 3 * * *' # Codziennie o 3:00 nad ranem czasu UTC

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: Install dependencies
        # Zmiana z npm ci na npm install rozwiązuje błąd braku synchronizacji lockfile
        run: npm install

      - name: Generate fresh sitemap from Firebase
        run: npm run generate:sitemap

      - name: Sync sitemap.xml to Seohost FTP
        uses: SamKirkland/FTP-Deploy-Action@v4.3.5
        with:
          server: ${{ secrets.FTP_SERVER }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.SEO_HOST_AJ }}
          protocol: ftp
          port: 21
          local-dir: ./public/
          server-dir: ./domains/gabinetpsychologagdansk.pl/public_html/
          # Bezpieczne wysyłanie wyłącznie pliku sitemap.xml bez nadpisywania reszty serwera
          exclude: |
            **/*
            !sitemap.xml
