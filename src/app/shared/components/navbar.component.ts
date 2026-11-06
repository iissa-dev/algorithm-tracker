import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlgorithmEngineService } from '../../core/services/algorithm-engine.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  protected readonly engine = inject(AlgorithmEngineService);

  protected readonly activeView = this.engine.activeView;
  protected readonly currentAlgorithm = this.engine.currentAlgorithm;

  goToCatalog(): void {
    this.engine.openCatalog();
  }
}
