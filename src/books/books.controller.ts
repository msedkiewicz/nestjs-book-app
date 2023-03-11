import { Controller, Get } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get('/')
  getAll() {
    return this.booksService.getAll();
  }
}

// GET /api/books
// Ten endpoint powinien po prostu zwracać dane o książkach, ale koniecznie wzbogacone o informacje o powiązanym autorze.

// GET /api/books/:id
// Ten endpoint powinien zwracać konkretną książkę, ale koniecznie wzbogaconą o informacje o powiązanym autorze. W razie podania id do nieistniejącej książki, należy zwrócić błąd 404 Not Found.

// DELETE /api/books/:id
// W tym endpoincie należy po prostu usuwać podaną książkę. W razie podania id do nieistniejącej książki, należy zwrócić błąd 404 Not Found.

// Pamiętaj, aby sprawdzać, czy id wygląda na identyfikator przygotowany przez paczkę uuid. Zadbaj także o to, aby w przypadku nie znalezienia autora, zwracać błąd 404 z komunikatem Book not found i nawet nie próbować usuwania.

// POST /api/books
// Ten endpoint powinien przyjmować od klienta informacje o tytule książki, cenie, ocenie, a także id autora którego chcemy z nią powiązać. W przypadku podania id autora, który nie istnieje, należy zwrócić błąd 400 Bad Request. Odpowiedni błąd należy zwrócić również w przypadku użyciu już zajętego tytułu – 409 Conflict z tekstem Title is already taken.

// Tworząc endpoint, przygotuj także odpowiednią klasę DTO i poinformuj Nesta, że dane z body mają spełniać właśnie jej oczekiwania.

// Klasa ta powinna posiadać następujące właściwości:

// title, a więc string mający od 3 do 100 znaków,
// rating ma być liczbą od 1 do 5,
// price jako cena powinien być również liczbą (min: 0, max: 1000),
// authorId powinien być identyfikatorem uuid, z którym chcemy powiązać naszą książkę.
// PUT /api/books/:id
// W przypadku edycji, oczekiwania będą identyczne jak w przypadku endpointu do dodawania danych. Z tym, że tutaj musisz jeszcze pilnować dodatkowo parametru id z linku. Powinniśmy bowiem sprawdzać, czy id wygląda jak identyfikator wygenerowany przez paczkę uuid.
