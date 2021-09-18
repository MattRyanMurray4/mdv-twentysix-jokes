import { Joke } from '@yo-mom/api-interfaces';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mapTo, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class JokesService {
  private model = 'jokes';
  constructor(private http: HttpClient) {}

  getAll(): Observable<Joke[]> {
    return this.http.get<Joke[]>(this.getApi()).pipe(map((joke) => joke));
  }

  findOne(id: string) {
    return this.http.get<Joke>(this.getApiUrlById(id));
  }

  update(joke: Joke) {
    return this.http.patch<Joke>(this.getApiUrlById(joke.id), joke);
  }

  delete(id: string) {
    return this.http.delete<string>(this.getApiUrlById(id)).pipe(mapTo(id));
  }

  private getApi() {
    return `${environment.apiUrl}${this.model}`;
  }

  private getApiUrlById(id: string) {
    return `${this.getApi()}/${id}`;
  }
}
