import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlgorithmEngineService } from '../../core/services/algorithm-engine.service';
import { SupportedLanguage } from '../../core/models/algorithm.model';

@Component({
  selector: 'app-code-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './code-viewer.component.html',
})
export class CodeViewerComponent {
  protected readonly engine = inject(AlgorithmEngineService);

  protected readonly selectedLanguage = this.engine.selectedLanguage;
  protected readonly currentAlgorithm = this.engine.currentAlgorithm;
  protected readonly activeLine = this.engine.activeCodeLine;

  protected readonly codeLines = computed(() => {
    const lang = this.selectedLanguage();
    const snippets = this.currentAlgorithm().codeSnippets;
    return snippets[lang] || [];
  });

  protected readonly copied = signal<boolean>(false);

  setLanguage(lang: SupportedLanguage): void {
    this.engine.setLanguage(lang);
  }

  copyCode(): void {
    const text = this.codeLines().join('\n');
    navigator.clipboard.writeText(text).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    });
  }
}
