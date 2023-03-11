import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { CreateBookDTO } from './dtos/create-book.dto';
import { UpdateBookDTO } from './dtos/update-book.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get('/')
  getAll() {
    return this.booksService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const book = await this.booksService.getById(id);
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  @Post('/')
  @UseGuards(JwtAuthGuard)
  public create(@Body() bookData: CreateBookDTO) {
    return this.booksService.create(bookData);
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  async updateById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() bookData: UpdateBookDTO,
  ) {
    if (!(await this.booksService.getById(id)))
      throw new NotFoundException('Book not found');
    await this.booksService.updateById(id, bookData);
    return { success: true };
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.booksService.getById(id)))
      throw new NotFoundException('Book not found');
    await this.booksService.delete(id);
    return { success: true };
  }
}

// GET /api/books
// Ten endpoint powinien po prostu zwracać dane o książkach, ale koniecznie wzbogacone o informacje o powiązanym autorze.

// GET /api/books/:id
// Ten endpoint powinien zwracać konkretną książkę, ale koniecznie wzbogaconą o informacje o powiązanym autorze. W razie podania id do nieistniejącej książki, należy zwrócić błąd 404 Not Found

// DELETE /api/books/:id
// W tym endpoincie należy po prostu usuwać podaną książkę. W razie podania id do nieistniejącej książki, należy zwrócić błąd 404 Not Found.

// Pamiętaj, aby sprawdzać, czy id wygląda na identyfikator przygotowany przez paczkę uuid. Zadbaj także o to, aby w przypadku nie znalezienia autora, zwracać błąd 404 z komunikatem Book not found i nawet nie próbować usuwania.

// POST /api/books
// Ten endpoint powinien przyjmować od klienta informacje o tytule książki, cenie, ocenie, a także id autora którego chcemy z nią powiązać. W przypadku podania id autora, który nie istnieje, należy zwrócić błąd 400 Bad Request. Odpowiedni błąd należy zwrócić również w przypadku użyciu już zajętego tytułu – 409 Conflict z tekstem Title is already taken.

// PUT /api/books/:id
// W przypadku edycji, oczekiwania będą identyczne jak w przypadku endpointu do dodawania danych. Z tym, że tutaj musisz jeszcze pilnować dodatkowo parametru id z linku. Powinniśmy bowiem sprawdzać, czy id wygląda jak identyfikator wygenerowany przez paczkę uuid.
