Please note: The English version of the project description can be found at the end of this document.

# BerAuto

**BerAuto** egy modern autókölcsönző rendszer, amely .NET 9 (ASP.NET Core) backendből és React + TypeScript frontendből áll. A projekt célja egy valósághű, több szerepkörös (ügyfél, alkalmazott, admin) autóbérlési platform megvalósítása.

## Főbb funkciók

- **Autók listázása, szűrése, kategóriák kezelése**
- **Felhasználói regisztráció, bejelentkezés, jogosultságkezelés (JWT)**
- **Bérlési igény leadása, bérlések kezelése (ügyfél, alkalmazott, admin nézet)**
- **Adminisztráció: autók, kategóriák, felhasználók, jogosultságok kezelése**
- **Alkalmazotti panel: bérlések jóváhagyása/elutasítása, átadás/visszavétel, számlagenerálás**
- **Profilkezelés, címkezelés**
- **Reszponzív, letisztult, fekete-fehér-lila színvilágú UI**

## Technológiák

- **Backend:** ASP.NET Core 9, Entity Framework Core, REST API, JWT autentikáció
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

## Fejlesztői információk

- A frontend és backend külön-külön is futtatható.
- A projekt reszponzív, letisztult UI-t használ.
- A jogosultságkezelés Context API-n és JWT-n alapul.
- A backend REST API-k dokumentáltak, a frontend minden végpontot használ.

## Képernyőképek

![image](https://github.com/user-attachments/assets/fc0dfceb-8b86-48b7-811b-78dbaedfb129)
![image](https://github.com/user-attachments/assets/735fc775-c51b-4cc6-a954-159cb7911a9a)
![image](https://github.com/user-attachments/assets/6ff8f61a-b219-4690-bab4-f2c515f20229)
![image](https://github.com/user-attachments/assets/cf03e55e-b85a-4143-9ffd-31fc34ae74f2)
![image](https://github.com/user-attachments/assets/db5f15ec-9e36-440c-ae22-7cfd75effc35)
![image](https://github.com/user-attachments/assets/54426c26-7116-4b05-8d95-39363ffd02bb)
![image](https://github.com/user-attachments/assets/ed8ac175-3267-44e0-b587-0af2b6d75280)


# BerAuto

**BerAuto** is a modern car rental system consisting of a .NET 9 (ASP.NET Core) backend and a React + TypeScript frontend. The goal of the project is to implement a realistic, multi-role (customer, employee, admin) car rental platform.

## Main Features

- **Car listing, filtering, category management**
- **User registration, login, role-based access control (JWT)**
- **Rental request submission, rental management (customer, employee, admin views)**
- **Administration: manage cars, categories, users, roles**
- **Employee panel: approve/reject rentals, handover/return, invoice generation**
- **Profile management, address handling**
- **Responsive, clean UI with black-white-purple color scheme**

## Technologies

- **Backend:** ASP.NET Core 9, Entity Framework Core, REST API, JWT authentication
- **Frontend:** React, TypeScript, React Router, Context API, modern CSS
- **Database:** MSSQL (EF migrations, test data)
- **Other:** Docker support, multi-level authorization, clean code structure

## Running the Project

### Backend

1. Navigate to the `BerAuto` folder.
2. Start the ASP.NET Core server:
   ```sh
   dotnet run
   ```
   or press F5 in Visual Studio.

### Frontend

1. Navigate to the `berauto-frontend` folder.
2. Install dependencies:
   ```sh
   npm install
3. Start the development server:
   ```sh
   npm start
   ```
4. The app will be available at: http://localhost:3000

## User Roles

- **Guest:** browse cars, submit rental requests
- **Customer:** view own rentals, profile, rental requests
- **Employee:** manage rentals, handover/return, invoicing
- **Admin:** full management of cars, categories, users, roles

---

## Developer Notes

- Frontend and backend can run independently.
- The project uses a responsive, clean UI.
- Role management is based on Context API and JWT.
- Backend REST APIs are documented, and the frontend uses all endpoints.
