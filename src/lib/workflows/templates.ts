export interface WorkflowStep {
  name: string
  description: string
  assignedRole?: 'tech' | 'ops-manager' | 'post-producer' | 'sales-admin'
}

export interface WorkflowTemplate {
  id: string
  name: string
  description: string
  steps: WorkflowStep[]
}

export const workflowTemplates: Record<string, WorkflowTemplate> = {
  'outsourced-scan-upload-client': {
    id: 'outsourced-scan-upload-client',
    name: 'Outsourced: Scan & Upload to Client',
    description: 'Matterport 3D Scan only and upload to client account',
    steps: [
      {
        name: 'Scan Completed',
        description: 'Tech completes the Matterport scan on-site',
        assignedRole: 'tech',
      },
      {
        name: 'Upload to Client Account',
        description: 'Tech uploads scan directly to client\'s Matterport account',
        assignedRole: 'tech',
      },
      {
        name: 'Confirm Upload',
        description: 'Verify upload completed successfully',
        assignedRole: 'ops-manager',
      },
    ],
  },

  'outsourced-scan-transfer': {
    id: 'outsourced-scan-transfer',
    name: 'Outsourced: Scan & Transfer',
    description: 'Scan, upload to our account, then transfer to client',
    steps: [
      {
        name: 'Scan Completed',
        description: 'Tech completes the Matterport scan on-site',
        assignedRole: 'tech',
      },
      {
        name: 'Upload to Our Account',
        description: 'Tech uploads scan to our Matterport account',
        assignedRole: 'tech',
      },
      {
        name: 'Model Processing',
        description: 'Wait for Matterport model to finish processing',
        assignedRole: 'ops-manager',
      },
      {
        name: 'Transfer to Client',
        description: 'Transfer processed model to client\'s email/account',
        assignedRole: 'ops-manager',
      },
    ],
  },

  'outsourced-scan-survey-images': {
    id: 'outsourced-scan-survey-images',
    name: 'Outsourced: Scan, Survey & Images',
    description: 'Scan, fill survey form, and upload images',
    steps: [
      {
        name: 'Scan Completed',
        description: 'Tech completes the Matterport scan on-site',
        assignedRole: 'tech',
      },
      {
        name: 'Upload Scan',
        description: 'Upload scan to designated account',
        assignedRole: 'tech',
      },
      {
        name: 'Complete Survey Form',
        description: 'Tech fills out client\'s survey form',
        assignedRole: 'tech',
      },
      {
        name: 'Upload Images',
        description: 'Tech uploads photos to client\'s link',
        assignedRole: 'tech',
      },
      {
        name: 'Verify Completion',
        description: 'Confirm all deliverables submitted',
        assignedRole: 'ops-manager',
      },
    ],
  },

  'direct-scan-hosted': {
    id: 'direct-scan-hosted',
    name: 'Direct: Scan Hosted by Us',
    description: 'Scan, QC, confirm sqft, send link, invoice, add hosting',
    steps: [
      {
        name: 'Scan Completed',
        description: 'Tech completes the Matterport scan on-site',
        assignedRole: 'tech',
      },
      {
        name: 'Upload to Our Account',
        description: 'Tech uploads scan to our Matterport account',
        assignedRole: 'tech',
      },
      {
        name: 'Quality Check',
        description: 'Review scan quality, accuracy, and coverage',
        assignedRole: 'ops-manager',
      },
      {
        name: 'Confirm Square Footage',
        description: 'Verify and update square footage from scan',
        assignedRole: 'ops-manager',
      },
      {
        name: 'Send Link to Customer',
        description: 'Email Matterport link to customer',
        assignedRole: 'ops-manager',
      },
      {
        name: 'Invoice Job',
        description: 'Create and send invoice to customer',
        assignedRole: 'sales-admin',
      },
      {
        name: 'Add Recurring Hosting Invoice',
        description: 'Set up $50/year hosting invoice (after first year)',
        assignedRole: 'sales-admin',
      },
    ],
  },

  'direct-scan-transfer': {
    id: 'direct-scan-transfer',
    name: 'Direct: Scan & Transfer',
    description: 'Scan, QC, confirm sqft, transfer to customer, invoice',
    steps: [
      {
        name: 'Scan Completed',
        description: 'Tech completes the Matterport scan on-site',
        assignedRole: 'tech',
      },
      {
        name: 'Upload to Our Account',
        description: 'Tech uploads scan to our Matterport account',
        assignedRole: 'tech',
      },
      {
        name: 'Quality Check',
        description: 'Review scan quality, accuracy, and coverage',
        assignedRole: 'ops-manager',
      },
      {
        name: 'Confirm Square Footage',
        description: 'Verify and update square footage from scan',
        assignedRole: 'ops-manager',
      },
      {
        name: 'Transfer to Customer',
        description: 'Transfer model to customer\'s email/account',
        assignedRole: 'ops-manager',
      },
      {
        name: 'Invoice Job',
        description: 'Create and send invoice to customer',
        assignedRole: 'sales-admin',
      },
    ],
  },

  'direct-scan-floorplan': {
    id: 'direct-scan-floorplan',
    name: 'Direct: Scan + Floor Plan',
    description: 'Scan hosted by us with floor plan from supplier',
    steps: [
      {
        name: 'Scan Completed',
        description: 'Tech completes the Matterport scan on-site',
        assignedRole: 'tech',
      },
      {
        name: 'Upload to Our Account',
        description: 'Tech uploads scan to our Matterport account',
        assignedRole: 'tech',
      },
      {
        name: 'Quality Check',
        description: 'Review scan quality, accuracy, and coverage',
        assignedRole: 'ops-manager',
      },
      {
        name: 'Request Floor Plan',
        description: 'Send model link to floor plan supplier',
        assignedRole: 'ops-manager',
      },
      {
        name: 'Send Link to Customer',
        description: 'Email Matterport link to customer',
        assignedRole: 'ops-manager',
      },
      {
        name: 'Receive Floor Plan',
        description: 'Receive completed floor plan from supplier',
        assignedRole: 'ops-manager',
      },
      {
        name: 'Send Floor Plan to Customer',
        description: 'Email floor plan to customer',
        assignedRole: 'ops-manager',
      },
      {
        name: 'Invoice Job',
        description: 'Create and send invoice to customer',
        assignedRole: 'sales-admin',
      },
      {
        name: 'Add Recurring Hosting Invoice',
        description: 'Set up $50/year hosting invoice (after first year)',
        assignedRole: 'sales-admin',
      },
    ],
  },

  'direct-scan-floorplan-photos': {
    id: 'direct-scan-floorplan-photos',
    name: 'Direct: Scan + Floor Plan + Photos',
    description: 'Scan hosted with floor plan and photo extraction',
    steps: [
      {
        name: 'Scan Completed',
        description: 'Tech completes the Matterport scan on-site',
        assignedRole: 'tech',
      },
      {
        name: 'Upload to Our Account',
        description: 'Tech uploads scan to our Matterport account',
        assignedRole: 'tech',
      },
      {
        name: 'Quality Check',
        description: 'Review scan quality, accuracy, and coverage',
        assignedRole: 'ops-manager',
      },
      {
        name: 'Post-Processing',
        description: 'Edit Matterport model and extract images',
        assignedRole: 'post-producer',
      },
      {
        name: 'Request Floor Plan',
        description: 'Send model link to floor plan supplier',
        assignedRole: 'ops-manager',
      },
      {
        name: 'Send Link to Customer',
        description: 'Email Matterport link to customer',
        assignedRole: 'ops-manager',
      },
      {
        name: 'Receive Floor Plan',
        description: 'Receive completed floor plan from supplier',
        assignedRole: 'ops-manager',
      },
      {
        name: 'Send Floor Plan to Customer',
        description: 'Email floor plan to customer',
        assignedRole: 'ops-manager',
      },
      {
        name: 'Upload Images to Drive',
        description: 'Upload extracted images to Google Drive folder',
        assignedRole: 'post-producer',
      },
      {
        name: 'Send Images Link to Customer',
        description: 'Email Drive folder link to customer',
        assignedRole: 'ops-manager',
      },
      {
        name: 'Confirm Square Footage',
        description: 'Verify and update square footage from scan',
        assignedRole: 'ops-manager',
      },
      {
        name: 'Invoice Job',
        description: 'Create and send invoice to customer',
        assignedRole: 'sales-admin',
      },
      {
        name: 'Add Recurring Hosting Invoice',
        description: 'Set up $50/year hosting invoice (after first year)',
        assignedRole: 'sales-admin',
      },
    ],
  },

  'direct-scan-asbuilts': {
    id: 'direct-scan-asbuilts',
    name: 'Direct: Scan + As-Builts',
    description: 'Scan hosted with as-built drawings in various formats',
    steps: [
      {
        name: 'Scan Completed',
        description: 'Tech completes the Matterport scan on-site',
        assignedRole: 'tech',
      },
      {
        name: 'Upload to Our Account',
        description: 'Tech uploads scan to our Matterport account',
        assignedRole: 'tech',
      },
      {
        name: 'Quality Check',
        description: 'Review scan quality, accuracy, and coverage',
        assignedRole: 'ops-manager',
      },
      {
        name: 'Request As-Builts',
        description: 'Send model link to as-built supplier with format specs',
        assignedRole: 'ops-manager',
      },
      {
        name: 'Confirm Square Footage',
        description: 'Verify and update square footage from scan',
        assignedRole: 'ops-manager',
      },
      {
        name: 'Send Link to Customer',
        description: 'Email Matterport link to customer',
        assignedRole: 'ops-manager',
      },
      {
        name: 'Invoice Job',
        description: 'Create and send invoice to customer',
        assignedRole: 'sales-admin',
      },
      {
        name: 'Receive As-Builts',
        description: 'Receive completed as-built drawings from supplier',
        assignedRole: 'ops-manager',
      },
      {
        name: 'Send As-Builts to Customer',
        description: 'Email as-built files to customer',
        assignedRole: 'ops-manager',
      },
      {
        name: 'Add Recurring Hosting Invoice',
        description: 'Set up $50/year hosting invoice (after first year)',
        assignedRole: 'sales-admin',
      },
    ],
  },
}

export function getWorkflowTemplate(workflowType: string): WorkflowTemplate | null {
  return workflowTemplates[workflowType] || null
}

export function getWorkflowSteps(workflowType: string): WorkflowStep[] {
  const template = getWorkflowTemplate(workflowType)
  return template ? template.steps : []
}
