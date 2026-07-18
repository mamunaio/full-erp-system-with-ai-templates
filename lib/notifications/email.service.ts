// Email service - placeholder implementation
// Install nodemailer and @types/nodemailer when ready to use

export class EmailService {
  static async sendFromTemplate(template: string, to: string, variables: any) {
    const subject = this.getTemplateSubject(template, variables);
    const html = this.getTemplateHtml(template, variables);

    // TODO: Configure SMTP and enable email sending
    // const transporter = nodemailer.createTransport({...});
    // await transporter.sendMail({ from, to, subject, html });
    
    console.log(`[EMAIL] Would send "${subject}" to ${to}`);
    return { success: true };
  }

  private static getTemplateSubject(template: string, vars: any) {
    const subjects: Record<string, string> = {
      invoice_reminder: `Payment Reminder - Invoice ${vars.number}`,
      low_stock: `Low Stock Alert: ${vars.productName}`,
      welcome: `Welcome to Injaazh ERP, ${vars.name}!`
    };
    return subjects[template] || "Notification from Injaazh ERP";
  }

  private static getTemplateHtml(template: string, vars: any) {
    return `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 20px;">
        <h2 style="color: #0d8ee9;">Injaazh ERP</h2>
        <hr style="border: 0; border-top: 1px solid #eee;" />
        <p>Hello ${vars.name || 'User'},</p>
        <p>${this.getTemplateBody(template, vars)}</p>
        <br />
        <a href="${process.env.NEXTAUTH_URL}" style="background: #0d8ee9; color: white; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-weight: bold;">View Details</a>
        <p style="color: #999; font-size: 12px; margin-top: 40px;">&copy; 2026 Injaazh ERP. All rights reserved.</p>
      </div>
    `;
  }

  private static getTemplateBody(template: string, vars: any) {
    const bodies: Record<string, string> = {
      invoice_reminder: `This is a reminder that invoice <b>${vars.number}</b> for <b>${vars.amount}</b> is overdue. Please process the payment as soon as possible.`,
      low_stock: `The product <b>${vars.productName}</b> has reached the reorder point. Current stock: <b>${vars.currentStock}</b>.`,
      welcome: `We're excited to have you on board. Explore your new enterprise dashboard today.`
    };
    return bodies[template] || "You have a new notification.";
  }
}
