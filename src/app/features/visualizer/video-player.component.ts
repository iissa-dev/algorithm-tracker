import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AlgorithmEngineService } from '../../core/services/algorithm-engine.service';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-player.component.html',
})
export class VideoPlayerComponent {
  private readonly sanitizer = inject(DomSanitizer);
  protected readonly engine = inject(AlgorithmEngineService);

  protected readonly currentAlgorithm = this.engine.currentAlgorithm;

  protected readonly videoUrl = computed(() => {
    return this.currentAlgorithm().metadata.videoUrl || 'https://www.youtube.com/embed/sh3ax9qOmY8?si=pL2mzbkuBIECM7Tg';
  });

  protected readonly videoTitle = computed(() => {
    return this.currentAlgorithm().metadata.videoTitle || 'فيديو شرح الخوارزمية';
  });

  protected readonly safeVideoUrl = computed<SafeResourceUrl>(() => {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl());
  });
}
