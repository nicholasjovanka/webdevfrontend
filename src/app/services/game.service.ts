import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Gamepaginate} from '../Interfaces/gamepaginate';
@Injectable({
  providedIn: 'root'
})
export class GameService {
  public gameId;
  constructor(private http: HttpClient) { }

  public AutoSuggest(Game: string): Observable<any> {
    const form = new FormData();
    form.append('gameName', Game);
    return this.http.post('https://api.threviews.me/api/getgamename', form);
  }
  public GetAllGame(): Observable<any> {
    return this.http.get('https://api.threviews.me/api/getallgamename');
  }
  public GetLatestGame(): Observable<any> {
    return this.http.get('https://api.threviews.me/api/getlatestgame');
  }
  public AddGame($request): Observable<any> {
   return this.http.post('https://api.threviews.me/api/addgame', $request);
  }
  public getCertaingame($id): Observable<any> {
    return this.http.get('https://api.threviews.me/api/getcertaingame/' + $id);
  }
  public getGameImage($id): Observable<any> {
    return this.http.get('https://api.threviews.me/api/getgameimage/' + $id, {responseType: 'blob'});
  }
  public updateGame($request, $id): Observable<any> {
    return this.http.post('https://api.threviews.me/api/updategame/' + $id, $request);
  }
  public deleteGame($id): Observable<any> {
   return this.http.delete('https://api.threviews.me/api/deletegame/' + $id);
  }

  public getGameId(name): Observable<any> {
    const form = new FormData();
    form.append('gameName', name);
    return this.http.post('https://api.threviews.me/api/getgameid' , form);
  }

  public getSteamGame($id): Observable<any> {
    return this.http.get('https://api.threviews.me/api/getsteamgame/' + $id);
  }
  // public Next(page = 1) {
  //   const param = new HttpParams().set('page', String(page));
  //   let http = this.http.get('http://localhost:8000/api/getallgamename?', {params: param}).subscribe(
  //     res => this.paginate.next(res)
  //   );
  // }
}
