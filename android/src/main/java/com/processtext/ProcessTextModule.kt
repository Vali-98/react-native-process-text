package com.processtext

import android.content.ComponentName
import android.content.pm.PackageManager
import android.content.Intent
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = ProcessTextModule.NAME)
class ProcessTextModule(reactContext: ReactApplicationContext) :
    NativeProcessTextSpec(reactContext) {

    private val pm: PackageManager = reactContext.packageManager
    private val component = ComponentName(reactContext, ProcessTextActivity::class.java)
    override fun getName(): String = NAME

    override fun setProcessTextIntentEnabled(enabled: Boolean, promise: Promise) {
        try {
            val newState = if (enabled)
                PackageManager.COMPONENT_ENABLED_STATE_ENABLED
            else
                PackageManager.COMPONENT_ENABLED_STATE_DISABLED

            pm.setComponentEnabledSetting(
                component,
                newState,
                PackageManager.DONT_KILL_APP
            )

            promise.resolve(null)
        } catch (e: Exception) {
            promise.reject("E_PROCESS_TEXT", "Failed to set state", e)
        }
    }

    override fun isProcessTextIntentEnabled(promise: Promise) {
        try {
            val state = pm.getComponentEnabledSetting(component)
            val enabled = when (state) {
                PackageManager.COMPONENT_ENABLED_STATE_ENABLED,
                PackageManager.COMPONENT_ENABLED_STATE_DEFAULT -> true
                PackageManager.COMPONENT_ENABLED_STATE_DISABLED -> false
                else -> true // default safe fallback
            }
            promise.resolve(enabled)
        } catch (e: Exception) {
            promise.reject("E_PROCESS_TEXT", "Failed to check state", e)
        }
    }

    override fun getProcessTextIntent(promise: Promise) {
        try {
            promise.resolve(ProcessTextActivity.lastProcessText)
            ProcessTextActivity.lastProcessText = null
        } catch (ex: Exception) {
            promise.reject("E_PROCESS_TEXT", "Failed to get process text", ex)
        }
    }

    companion object {
        const val NAME = "ProcessText"
    }
}
