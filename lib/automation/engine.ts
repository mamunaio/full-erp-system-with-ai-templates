import prisma from "@/lib/prisma";

export class AutomationEngine {
  static async processEvent(event: string, tenantId: string, data: any) {
    try {
      const automations = await prisma.automation.findMany({
        where: {
          tenantId,
          trigger: event,
          isActive: true
        }
      });

      for (const automation of automations) {
        const conditionsPassed = await this.evaluateConditions(automation.conditions, data);
        
        if (conditionsPassed) {
          await this.executeActions(automation.actions as any[], data, tenantId);
        }
      }
    } catch (error) {
      console.error("Automation Engine Error:", error);
    }
  }

  private static async evaluateConditions(conditions: any, data: any) {
    if (!conditions) return true;
    const conditionArray = Array.isArray(conditions) ? conditions : [];
    if (conditionArray.length === 0) return true;
    return true;
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
              userId: action.userId || data.userId,
              title: action.title,
              description: action.message || action.description || "Automation notification",
              type: "info",
              category: "SYSTEM"
            }
          });
          break;
        case "create_record":
          break;
      }
    }
  }
}
