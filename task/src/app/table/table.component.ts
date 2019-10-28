import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { DataService } from '../data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource;
  displayedColumns: string[];
  panelOpenState: boolean;
  detail = Object;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.panelOpenState = false;
    this.dataService.getData().subscribe(res => {
      const data = [];
      // console.log({ position: 0, data: res[0].data, location: res[0].location });
      // console.log({ position: 0, ...res[0] });
      for (let i = 0; i < res.length; i++) {
        data.push({ position: i, ...res[i] });
      }
      // console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.displayedColumns = [
      'position',
      'title',
      'city',
      'address',
      'postcode',
      'start_year'
    ];
  }
  showDetail(detail) {
    console.log(detail);

    this.detail = detail;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
