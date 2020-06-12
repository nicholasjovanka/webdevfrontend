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
    return this.http.post('http://localhost:8000/api/getgamename', form);
  }
  public GetAllGame(): Observable<any> {
    return this.http.get('http://localhost:8000/api/getallgamename');
  }
  public GetLatestGame(): Observable<any> {
    return this.http.get('http://localhost:8000/api/getlatestgame');
  }
  public AddGame($request): Observable<any> {
   return this.http.post('http://localhost:8000/api/addgame', $request);
  }
  public getCertaingame($id): Observable<any> {
    return this.http.get('http://localhost:8000/api/getcertaingame/' + $id);
  }
  public getGameImage($id): Observable<any> {
    return this.http.get('http://localhost:8000/api/getgameimage/' + $id, {responseType: 'blob'});
  }
  public updateGame($request, $id): Observable<any> {
    return this.http.post('http://localhost:8000/api/updategame/' + $id, $request);
  }
  public deleteGame($id): Observable<any> {
   return this.http.delete('http://localhost:8000/api/deletegame/' + $id);
  }
  public setGameId(id) {
    this.gameId = id;
  }
  public getGameId() {
    return this.gameId;
  }

  public getSteamGame($id): Observable<any> {
    return this.http.get('http://localhost:8000/api/getsteamgame/' + $id);
  }
  // public Next(page = 1) {
  //   const param = new HttpParams().set('page', String(page));
  //   let http = this.http.get('http://localhost:8000/api/getallgamename?', {params: param}).subscribe(
  //     res => this.paginate.next(res)
  //   );
  // }
}
