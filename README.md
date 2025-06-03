# BerAuto

**BerAuto** egy modern, teljes stack autókölcsönző rendszer, amely .NET 8 (ASP.NET Core) backendből és React + TypeScript frontendből áll. A projekt célja egy valósághű, több szerepkörös (ügyfél, alkalmazott, admin) autóbérlési platform megvalósítása.

## Főbb funkciók

- **Autók listázása, szűrése, kategóriák kezelése**
- **Felhasználói regisztráció, bejelentkezés, jogosultságkezelés (JWT)**
- **Bérlési igény leadása, bérlések kezelése (ügyfél, alkalmazott, admin nézet)**
- **Adminisztráció: autók, kategóriák, felhasználók, jogosultságok kezelése**
- **Alkalmazotti panel: bérlések jóváhagyása/elutasítása, átadás/visszavétel, számlagenerálás**
- **Profilkezelés, címkezelés**
- **Reszponzív, letisztult, fekete-fehér-lila színvilágú UI**

## Technológiák

- **Backend:** ASP.NET Core 8, Entity Framework Core, REST API, JWT autentikáció
- **Frontend:** React, TypeScript, React Router, Context API, modern CSS
- **Adatbázis:** MSSQL (EF migrációk, tesztadatok)
- **Egyéb:** Docker támogatás, többkörös jogosultság, letisztult kódstruktúra

## Futtatás

### Backend

1. Lépj be a `BerAuto` mappába.
2. Indítsd el az ASP.NET Core szervert:
   ```sh
   dotnet run
   ```
   vagy Visual Studio-ban F5.

### Frontend

1. Lépj be a `berauto-frontend` mappába.
2. Telepítsd a függőségeket:
   ```sh
   npm install
   ```
3. Indítsd el a fejlesztői szervert:
   ```sh
   npm start
   ```
4. Az alkalmazás elérhető: [http://localhost:3000](http://localhost:3000)

## Felhasználói szerepkörök

- **Vendég:** autók böngészése, bérlési igény leadása
- **Ügyfél:** saját bérlések, profil, bérlési igény
- **Alkalmazott:** bérlések kezelése, átadás/visszavétel, számlázás
- **Admin:** autók, kategóriák, felhasználók, jogosultságok teljes körű kezelése

## Főbb mappák

- `BerAuto/` – ASP.NET Core backend (Controllers, Entities, Dtos, Service, DataContext)
- `berauto-frontend/` – React + TypeScript frontend (src/pages, src/components, src/global.css)
- `BerAuto.DataContext/` – EF migrációk, adatbázis modellek

## Fejlesztői információk

- A frontend és backend külön-külön is futtatható.
- A projekt reszponzív, mobilbarát, letisztult UI-t használ.
- A jogosultságkezelés Context API-n és JWT-n alapul.
- A backend REST API-k dokumentáltak, a frontend minden végpontot használ.

## Képernyőképek

*(Ide illeszthetsz screenshotokat a főbb oldalakról, ha szeretnéd.)*

