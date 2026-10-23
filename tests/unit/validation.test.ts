import { describe, expect, it } from "vitest";
import {
  careerFields,
  careerRequiredFields,
  careerRules,
  contactFields,
  contactRules,
  isCareerCv,
  maxCvBytes,
  requiredFields,
} from "@/lib/validation";

describe("lib/validation", () => {
  describe("requiredFields", () => {
    it("marks name, email, and message as required", () => {
      expect(requiredFields).toEqual(["name", "email", "message"]);
    });

    it("covers only fields defined in contactFields", () => {
      for (const field of requiredFields) {
        expect(contactFields).toContain(field);
      }
    });
  });

  describe("contactRules.name", () => {
    it("rejects empty string and whitespace-only", () => {
      expect(contactRules.name("")).toBe(false);
      expect(contactRules.name(" ")).toBe(false);
      expect(contactRules.name("   \t\n  ")).toBe(false);
    });

    it("rejects single character name", () => {
      expect(contactRules.name("A")).toBe(false);
      expect(contactRules.name(" a ")).toBe(false);
    });

    it("accepts valid names (2+ chars after trim)", () => {
      expect(contactRules.name("Al")).toBe(true);
      expect(contactRules.name("Krishna Patil")).toBe(true);
      expect(contactRules.name("   John Doe   ")).toBe(true);
    });

    it("accepts unicode names", () => {
      expect(contactRules.name("José García")).toBe(true);
      expect(contactRules.name("李四")).toBe(true);
      expect(contactRules.name("طارق")).toBe(true);
      expect(contactRules.name("Müller")).toBe(true);
    });
  });

  describe("contactRules.email", () => {
    it("rejects empty or whitespace", () => {
      expect(contactRules.email("")).toBe(false);
      expect(contactRules.email("   ")).toBe(false);
    });

    it("rejects emails without @ or without domain", () => {
      expect(contactRules.email("plainaddress")).toBe(false);
      expect(contactRules.email("@company.com")).toBe(false);
      expect(contactRules.email("user@")).toBe(false);
    });

    it("rejects emails without TLD or with 1-character TLD", () => {
      expect(contactRules.email("user@company")).toBe(false);
      expect(contactRules.email("user@company.c")).toBe(false);
    });

    it("accepts valid emails with 2+ char TLDs", () => {
      expect(contactRules.email("name@company.com")).toBe(true);
      expect(contactRules.email("user.name+tag@sub.domain.co.uk")).toBe(true);
      expect(contactRules.email("krishna@brandsparkx.com")).toBe(true);
    });
  });

  describe("contactRules.phone", () => {
    it("accepts empty or undefined string as phone is optional", () => {
      expect(contactRules.phone("")).toBe(true);
    });

    it("accepts valid phone numbers with + country code, spaces, and brackets", () => {
      expect(contactRules.phone("+971 55 996 3778")).toBe(true);
      expect(contactRules.phone("+91 93532 25524")).toBe(true);
      expect(contactRules.phone("(123) 456-7890")).toBe(true);
      expect(contactRules.phone("+1-800-555-0199")).toBe(true);
      expect(contactRules.phone("+971559963778")).toBe(true);
    });

    it("rejects numbers that are too short (<7 chars)", () => {
      expect(contactRules.phone("12345")).toBe(false);
      expect(contactRules.phone("+123")).toBe(false);
    });

    it("rejects strings containing letters or invalid characters", () => {
      expect(contactRules.phone("+971 55 CALL ME")).toBe(false);
      expect(contactRules.phone("phone1234567")).toBe(false);
    });
  });

  describe("contactRules.website", () => {
    it("accepts empty string as website is optional", () => {
      expect(contactRules.website("")).toBe(true);
    });

    it("accepts http and https websites", () => {
      expect(contactRules.website("https://brandsparkx.com")).toBe(true);
      expect(contactRules.website("http://example.org")).toBe(true);
      expect(contactRules.website("https://sub.domain.co/path?param=1")).toBe(true);
    });

    it("rejects websites missing scheme", () => {
      expect(contactRules.website("brandsparkx.com")).toBe(false);
      expect(contactRules.website("www.brandsparkx.com")).toBe(false);
    });

    it("rejects non-http(s) schemes or malformed URLs", () => {
      expect(contactRules.website("ftp://example.com")).toBe(false);
      expect(contactRules.website("javascript:alert(1)")).toBe(false);
      expect(contactRules.website("https://")).toBe(false);
    });
  });

  describe("contactRules.message", () => {
    it("rejects empty, whitespace, and < 10 chars", () => {
      expect(contactRules.message("")).toBe(false);
      expect(contactRules.message("   ")).toBe(false);
      expect(contactRules.message("123456789")).toBe(false); // 9 chars
      expect(contactRules.message("   123456789   ")).toBe(false); // 9 chars after trim
    });

    it("accepts exactly 10 characters and longer messages", () => {
      expect(contactRules.message("1234567890")).toBe(true); // 10 chars
      expect(contactRules.message("  1234567890  ")).toBe(true); // 10 chars trimmed
      expect(
        contactRules.message("We would like to automate our customer service operations."),
      ).toBe(true);
    });
  });

  describe("careerRules", () => {
    it("requires name, email, and position", () => {
      expect(careerRequiredFields).toEqual(["name", "email", "position"]);
      for (const field of careerRequiredFields) {
        expect(careerFields).toContain(field);
      }
    });

    it("rejects an empty position and accepts a role name", () => {
      expect(careerRules.position("")).toBe(false);
      expect(careerRules.position("A")).toBe(false);
      expect(careerRules.position("AI Engineer")).toBe(true);
    });

    it("allows an empty location and only listed values", () => {
      expect(careerRules.location("")).toBe(true);
      expect(careerRules.location("Dubai, UAE")).toBe(true);
      expect(careerRules.location("London")).toBe(false);
    });

    it("uses the contact link rule for an optional portfolio link", () => {
      expect(careerRules.portfolio("")).toBe(true);
      expect(careerRules.portfolio("https://linkedin.com/in/amina")).toBe(true);
      expect(careerRules.portfolio("linkedin.com/in/amina")).toBe(false);
    });

    it("requires a PDF, DOC or DOCX CV up to 5 MB", () => {
      const docx = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      expect(isCareerCv(null)).toBe(false);
      expect(isCareerCv(new File(["cv"], "amina.pdf", { type: "application/pdf" }))).toBe(true);
      expect(isCareerCv(new File(["cv"], "amina.PDF", { type: "" }))).toBe(true);
      expect(isCareerCv(new File(["cv"], "amina.doc", { type: "application/msword" }))).toBe(true);
      expect(isCareerCv(new File(["cv"], "amina.docx", { type: docx }))).toBe(true);
      expect(isCareerCv(new File(["cv"], "amina.png", { type: "image/png" }))).toBe(false);
      expect(isCareerCv(new File(["cv"], "amina.exe", { type: "application/pdf" }))).toBe(false);
      expect(isCareerCv(new File([new Uint8Array(maxCvBytes + 1)], "big.pdf"))).toBe(false);
    });

    it("accepts an empty experience and message", () => {
      expect(careerRules.experience("")).toBe(true);
      expect(careerRules.message("")).toBe(true);
    });
  });
});
