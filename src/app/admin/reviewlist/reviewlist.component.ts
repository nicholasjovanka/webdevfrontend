import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {Game} from '../../Interfaces/game';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {map, switchMap, takeUntil} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';
import {ReviewServiceService} from '../../services/review-service.service';
import {Review} from '../../Interfaces/review';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CustomDialogComponent} from '../../custom-dialog/custom-dialog.component';

@Component({
  selector: 'app-reviewlist',
  templateUrl: './reviewlist.component.html',
  styleUrls: ['./reviewlist.component.css']
})
export class ReviewlistComponent implements OnInit, OnDestroy {
  constructor(private review: ReviewServiceService, private route: ActivatedRoute,
              private router: Router, public dialog: MatDialog, private snackbar: MatSnackBar) { }
  reviewname = new FormControl('');
  displayedColumns: string[] = ['user_id', 'userReview', 'userScore'];
  dataUnformated: Review[];
  dataSource ;
  loaded = false;
  id;
  private ngUnsubscribe = new Subject();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit(): void {
    this.route.paramMap.pipe(map(res => {this.id = res.get('id'); return res; }),
      switchMap(res => this.review.getgamereview(res.get('id'))))
      .subscribe((res: Review[]) => {
        if (res) {
          console.log(res);
          this.dataUnformated = res;
          this.dataSource = new MatTableDataSource(this.dataUnformated);
          this.loaded = true; this.dataSource.sort = this.sort; this.dataSource.paginator = this.paginator;
        }
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  log(element) {
  }
  applyFilter($event) {
    this.dataSource.filter = $event.target.value.toLowerCase();
  }
  deleteReview(row) {
    const dialogRef = this.dialog.open(CustomDialogComponent, {
      width: '400px',
      height: '300px'
    });
    dialogRef.afterClosed().subscribe( res => {
      if (res === 'true') {
        this.review.deleteReviewAdmin(row.user_id, this.id).subscribe( result => {
        }, err => {     this.snackbar.open('Game Deleted', 'Dismiss', {duration: 2000}); setTimeout( e => location.reload() , 2000); } );
      }
    });
  }
  navigateToAddGame() {
    this.router.navigate(['admin/addgame']);
  }
}
