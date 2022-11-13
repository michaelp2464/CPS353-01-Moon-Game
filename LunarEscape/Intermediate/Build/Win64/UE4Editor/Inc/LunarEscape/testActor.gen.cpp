// Copyright Epic Games, Inc. All Rights Reserved.
/*===========================================================================
	Generated code exported from UnrealHeaderTool.
	DO NOT modify this manually! Edit the corresponding .h files instead!
===========================================================================*/

#include "UObject/GeneratedCppIncludes.h"
#include "LunarEscape/testActor.h"
#ifdef _MSC_VER
#pragma warning (push)
#pragma warning (disable : 4883)
#endif
PRAGMA_DISABLE_DEPRECATION_WARNINGS
void EmptyLinkFunctionForGeneratedCodetestActor() {}
// Cross Module References
	LUNARESCAPE_API UClass* Z_Construct_UClass_AtestActor_NoRegister();
	LUNARESCAPE_API UClass* Z_Construct_UClass_AtestActor();
	ENGINE_API UClass* Z_Construct_UClass_AActor();
	UPackage* Z_Construct_UPackage__Script_LunarEscape();
// End Cross Module References
	void AtestActor::StaticRegisterNativesAtestActor()
	{
	}
	UClass* Z_Construct_UClass_AtestActor_NoRegister()
	{
		return AtestActor::StaticClass();
	}
	struct Z_Construct_UClass_AtestActor_Statics
	{
		static UObject* (*const DependentSingletons[])();
#if WITH_METADATA
		static const UE4CodeGen_Private::FMetaDataPairParam Class_MetaDataParams[];
#endif
		static const FCppClassTypeInfoStatic StaticCppClassTypeInfo;
		static const UE4CodeGen_Private::FClassParams ClassParams;
	};
	UObject* (*const Z_Construct_UClass_AtestActor_Statics::DependentSingletons[])() = {
		(UObject* (*)())Z_Construct_UClass_AActor,
		(UObject* (*)())Z_Construct_UPackage__Script_LunarEscape,
	};
#if WITH_METADATA
	const UE4CodeGen_Private::FMetaDataPairParam Z_Construct_UClass_AtestActor_Statics::Class_MetaDataParams[] = {
		{ "IncludePath", "testActor.h" },
		{ "ModuleRelativePath", "testActor.h" },
	};
#endif
	const FCppClassTypeInfoStatic Z_Construct_UClass_AtestActor_Statics::StaticCppClassTypeInfo = {
		TCppClassTypeTraits<AtestActor>::IsAbstract,
	};
	const UE4CodeGen_Private::FClassParams Z_Construct_UClass_AtestActor_Statics::ClassParams = {
		&AtestActor::StaticClass,
		"Engine",
		&StaticCppClassTypeInfo,
		DependentSingletons,
		nullptr,
		nullptr,
		nullptr,
		UE_ARRAY_COUNT(DependentSingletons),
		0,
		0,
		0,
		0x009000A4u,
		METADATA_PARAMS(Z_Construct_UClass_AtestActor_Statics::Class_MetaDataParams, UE_ARRAY_COUNT(Z_Construct_UClass_AtestActor_Statics::Class_MetaDataParams))
	};
	UClass* Z_Construct_UClass_AtestActor()
	{
		static UClass* OuterClass = nullptr;
		if (!OuterClass)
		{
			UE4CodeGen_Private::ConstructUClass(OuterClass, Z_Construct_UClass_AtestActor_Statics::ClassParams);
		}
		return OuterClass;
	}
	IMPLEMENT_CLASS(AtestActor, 2023523814);
	template<> LUNARESCAPE_API UClass* StaticClass<AtestActor>()
	{
		return AtestActor::StaticClass();
	}
	static FCompiledInDefer Z_CompiledInDefer_UClass_AtestActor(Z_Construct_UClass_AtestActor, &AtestActor::StaticClass, TEXT("/Script/LunarEscape"), TEXT("AtestActor"), false, nullptr, nullptr, nullptr);
	DEFINE_VTABLE_PTR_HELPER_CTOR(AtestActor);
PRAGMA_ENABLE_DEPRECATION_WARNINGS
#ifdef _MSC_VER
#pragma warning (pop)
#endif
