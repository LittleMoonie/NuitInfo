
# Nuit de l'info 2024



### Prérequis

Afin de pouvoir pleinement utiliser le projet, il y a quelques prérequis :
* Composer : [Installer Composer](https://getcomposer.org/)
  Pour vérifier la bonne installation de Comoser :
  ```sh
  composer
  ```
* NodeJS : [Installer Composer](https://nodejs.org/en/download)
  Pour vérifier la bonne installation de NodeJS :
  ```sh
  npm -v
  ```


### Installation

1. Cloner le projet
    ```sh
    git clone https://github.com/Fat2Nash/ClutchSeries.git
    ```
OU
*Télécharger le projet*

2. Installer les packages Composer
    ```sh
    composer install
    ```
3. Installer les packages NodeJS
    ```sh
    npm install
    ```
4. Créer une clé d'application
    ```bash
    php artisan key:generate
    ```
5. Créer le fichier ```.env``` à partir du fichier ```.env.example``` et ajuster si besoin :
    ```env
    DB_CONNECTION=sqlite # mettre mysql si besoin de mysql 
      
    # DB_HOST=127.0.0.1 ##mettre l'ip du serveur SQL
      
    # DB_PORT=3306 #mettre le port d'écoute du serveur SQL
    
    # DB_DATABASE=projet #mettre le nom de la base de donnée souhaité
      
    # DB_USERNAME=root #mettre le nom d'utilisateur souhaité
      
    # DB_PASSWORD= #mettre le mot de passe pour se connecter
      
    # DB_COLLATION=utf8mb4_general_ci # pour mysql
    ```
## Base de donées

    ```bash
    php artisan migrate  |  Créer la BDD 
    ```

## Pré-remplir la base de données

    ```
    php artisan db:seed   | Si les seeder sont créé
    ```

## Run le projet

    ```bash
    composer run dev
    ```

OU

    ```bash
    php artisan serve 
    
    npm run dev
    ```
## API Reference

#### Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.


## Authors

- [@Lazaro](https://github.com/LittleMoonie)
- [@Michel](https://github.com/MichelBKT)
- [@Lena](https://github.com/LenaGonzalezBreton)
- [@Alexy](https://github.com/thedarkman195)
- [@Quentin](https://github.com/Fat2Nash)

