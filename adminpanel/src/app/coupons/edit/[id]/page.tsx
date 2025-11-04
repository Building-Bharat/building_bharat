"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

type Coupon = {
  _id: string;
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  isActive: boolean;
  validFrom: string;
  validUntil: string;
  usageLimit: number | null;
  usedCount: number;
  minimumOrderAmount: number;
  createdAt: string;
};

export default function EditCouponPage() {
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [formData, setFormData] = useState({
    description: "",
    discountType: "percentage" as "percentage" | "fixed",
    discountValue: "",
    validFrom: "",
    validUntil: "",
    usageLimit: "",
    minimumOrderAmount: "0",
    isActive: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();
  const params = useParams();
  const couponId = params.id as string;

  useEffect(() => {
    fetchCoupon();
  }, [couponId]);

  const fetchCoupon = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/coupon/${couponId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const couponData = data.coupon;
        setCoupon(couponData);
        
        // Format dates for datetime-local input
        const formatDateForInput = (dateString: string) => {
          const date = new Date(dateString);
          return date.toISOString().slice(0, 16);
        };

        setFormData({
          description: couponData.description,
          discountType: couponData.discountType,
          discountValue: couponData.discountValue.toString(),
          validFrom: formatDateForInput(couponData.validFrom),
          validUntil: formatDateForInput(couponData.validUntil),
          usageLimit: couponData.usageLimit ? couponData.usageLimit.toString() : "",
          minimumOrderAmount: couponData.minimumOrderAmount.toString(),
          isActive: couponData.isActive,
        });
      } else {
        setError("Failed to fetch coupon details");
      }
    } catch (err) {
      setError("Error fetching coupon");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/coupon/${couponId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...formData,
            discountValue: parseFloat(formData.discountValue),
            usageLimit: formData.usageLimit ? parseInt(formData.usageLimit) : null,
            minimumOrderAmount: parseFloat(formData.minimumOrderAmount),
          }),
        }
      );

      if (response.ok) {
        setSuccess("Coupon updated successfully!");
        setTimeout(() => {
          router.push("/coupons");
        }, 2000);
      } else {
        const data = await response.json();
        setError(data.message || "Failed to update coupon");
      }
    } catch (err) {
      setError("Error updating coupon");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!coupon) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          Coupon not found
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Coupon</h1>
          <p className="text-gray-600">Update coupon details and settings</p>
        </div>
        <button
          onClick={() => router.push("/coupons")}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
        >
          Back to Coupons
        </button>
      </div>

      {/* Coupon Info Card */}
      <div className="bg-white rounded-lg shadow border p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Coupon Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-500">Coupon Code</label>
            <p className="text-lg font-bold text-gray-900">{coupon.code}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Times Used</label>
            <p className="text-lg font-bold text-blue-600">
              {coupon.usedCount} / {coupon.usageLimit || '∞'}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Created On</label>
            <p className="text-lg font-bold text-gray-900">{formatDate(coupon.createdAt)}</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-6">
          {success}
        </div>
      )}

      {/* Edit Form */}
      <div className="bg-white rounded-lg shadow border p-6">
        <h2 className="text-lg font-semibold mb-4">Edit Coupon Details</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount Type *
              </label>
              <select
                value={formData.discountType}
                onChange={(e) => setFormData({ ...formData, discountType: e.target.value as "percentage" | "fixed" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={coupon.usedCount > 0} // Don't allow changing type if already used
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
              </select>
              {coupon.usedCount > 0 && (
                <p className="text-sm text-gray-500 mt-1">
                  Cannot change discount type for used coupons
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount Value *
              </label>
              <input
                type="number"
                value={formData.discountValue}
                onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                max={formData.discountType === "percentage" ? "100" : undefined}
                required
                disabled={coupon.usedCount > 0} // Don't allow changing value if already used
              />
              {coupon.usedCount > 0 && (
                <p className="text-sm text-gray-500 mt-1">
                  Cannot change discount value for used coupons
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valid From *
              </label>
              <input
                type="datetime-local"
                value={formData.validFrom}
                onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valid Until *
              </label>
              <input
                type="datetime-local"
                value={formData.validUntil}
                onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Usage Limit
              </label>
              <input
                type="number"
                value={formData.usageLimit}
                onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min={coupon.usedCount.toString()} // Can't set limit below current usage
                placeholder="Unlimited"
              />
              <p className="text-sm text-gray-500 mt-1">
                Current usage: {coupon.usedCount}. Limit must be at least {coupon.usedCount}.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Order Amount
              </label>
              <input
                type="number"
                value={formData.minimumOrderAmount}
                onChange={(e) => setFormData({ ...formData, minimumOrderAmount: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="mr-2"
              />
              <span className="text-sm font-medium text-gray-700">Active</span>
            </label>
            <p className="text-sm text-gray-500 mt-1">
              Inactive coupons cannot be used by customers
            </p>
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={() => router.push("/coupons")}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? "Updating..." : "Update Coupon"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
