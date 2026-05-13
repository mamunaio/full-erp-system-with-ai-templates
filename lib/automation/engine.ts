import prisma from "@/lib/prisma";

export class AutomationEngine {
  static async processEvent(event: string, tenantId: string, data: any) {
    try {
      // 1. Find all active automations for this tenant with the matching trigger
      const automations = await prisma.automation.findMany({
        where: {
          tenantId,
          trigger: event,
          active: true
        }
      });

      for (const automation of automations) {
        // 2. Evaluate conditions (simplified logic for now)
        const conditionsPassed = await this.evaluateConditions(automation.conditions, data);
        
        if (conditionsPassed) {
          // 3. Execute actions
          await this.executeActions(automation.actions, data, tenantId);
          
          // 4. Log success
          await prisma.automationLog.create({
            data: {
              automationId: automation.id,
              tenantId,
              status: "SUCCESS",
              details: `Executed ${automation.actions.length} actions for ${event}`
            }
          });
        }
      }
    } catch (error) {
      console.error("Automation Engine Error:", error);
    }
  }

  private static async evaluateConditions(conditions: any, data: any) {
    if (!conditions || conditions.length === 0) return true;
    // Logic to evaluate conditions against data
    // Example: data.amount > 50000
    return true; // Simplified
  }

  private static async executeActions(actions: any[], data: any, tenantId: string) {
    for (const action of actions) {
      switch (action.type) {
        case "send_email":
          console.log(`Sending email to ${action.to} with data:`, data);
          break;
        case "send_in_app":
          await prisma.notification.create({
            data: {
              tenantId,
              userId: action.userId || data.userId, // fallback
              title: action.title,
              message: action.message,
              type: "SYSTEM"
            }
          });
          break;
        case "create_record":
          // Logic to create records in other modules
          break;
      }
    }
  }
}
