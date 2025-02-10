import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LeadScoringService } from '../../services/lead-scoring.service';

@Component({
  selector: 'app-lead-form',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './lead-form.component.html',
  styleUrls: ['./lead-form.component.css']
})
export class LeadFormComponent {
  lead = { email: '', message: '' };
  leadScore: number | null = null;
  loading = false;  // Indicates API request in progress

  constructor(private leadScoringService: LeadScoringService) {}

  submitLead() {
    if (!this.lead.email || !this.lead.message) {
      alert('Please enter both the email and inquiry message.');
      return;
    }

    this.loading = true;  // Show loading state

    this.leadScoringService.getLeadScore(this.lead.message).subscribe({
      next: response => {
        this.leadScore = response.lead_score;
        this.loading = false;  // Hide loading
      },
      error: err => {
        console.error('Error fetching lead score:', err);
        alert('An error occurred while processing the lead.');
        this.loading = false;
      }
    });
  }

  getScoreClass(score: number | null) {
    if (score === null) return '';
    if (score >= 80) return 'high-score';
    if (score >= 50) return 'medium-score';
    return 'low-score';
  }

  getScoreMessage(score: number | null) {
    if (score === null) return '';
    if (score >= 80) return '🔥 High-Quality Lead! Likely to convert.';
    if (score >= 50) return '⚠️ Moderate-Quality Lead. Needs follow-up.';
    return '❌ Low-Quality Lead. Low conversion probability.';
  }
}
